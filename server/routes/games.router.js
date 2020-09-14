const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/myGames', async (req, res) => {
    const client = await pool.connect();

    try{
        const users_id = req.user.id
        const firstQueryText = `SELECT game_instance.id FROM "game_instance"
            FULL JOIN "game" ON game_instance.game_id = game.id
            FULL JOIN "players" ON game_instance.id = players.game_instance_id
            FULL JOIN "user" ON players.users_id = "user".id
            WHERE "players".users_id  = $1
            ORDER BY "game_instance".date_played DESC;`

        await client.query('BEGIN')
        const gameSelectResults = await client.query(firstQueryText, [users_id]);
        const gameInstanceIds = gameSelectResults.rows
        console.log(gameInstanceIds);

        const results = await Promise.all(gameInstanceIds.map(gameInstance => {
            const queryText = `SELECT * FROM "game" 
            FULL JOIN "game_instance" ON game.id = game_instance.game_id
            FULL JOIN "players" ON game_instance.id = players.game_instance_id
            FULL JOIN "user" ON players.users_id = "user".id
            WHERE "game_instance".id = $1`

            return client.query(queryText, [gameInstance.id])
        }))
        //results is an array, each index is a different array that has rows with a game instance in it
        //loop of results at each index, each has .rows (spread)        
        const games = results.map( result => {
            const gameInstance = result.rows[0]
            const players = []
            result.rows.map(user => {
                players.push({
                    users_id: user.users_id,
                    username: user.username,
                    players_name: user.players_name,
                    score: user.score,
                    is_winner: user.is_winner
                })
            })
            return {gameInstance, players}
        })
        
        await client.query('COMMIT')
        res.send(games)
    

    } catch {
        await client.query('ROLLBACK')
        console.log('Error GET /api/game', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
  });

router.get('/myGamesAgainst/:id', async (req, res) => {
    const client = await pool.connect();

    try{
        const users_id = req.user.id
        const requested_id = req.params.id
        const firstQueryText = `SELECT game_instance.id FROM "game_instance"
            FULL JOIN "game" ON game_instance.game_id = game.id
            FULL JOIN "players" ON game_instance.id = players.game_instance_id
            FULL JOIN "user" ON players.users_id = "user".id
            WHERE "players".users_id IN ($1, $2)
            GROUP BY game_instance.id HAVING count("players".users_id) = 2
            ORDER BY "game_instance".date_played DESC;`

        await client.query('BEGIN')
        const gameSelectResults = await client.query(firstQueryText, [users_id, requested_id]);
        const gameInstanceIds = gameSelectResults.rows
        console.log(gameInstanceIds);

        const results = await Promise.all(gameInstanceIds.map(gameInstance => {
            const queryText = `SELECT * FROM "game" 
            FULL JOIN "game_instance" ON game.id = game_instance.game_id
            FULL JOIN "players" ON game_instance.id = players.game_instance_id
            FULL JOIN "user" ON players.users_id = "user".id
            WHERE "game_instance".id = $1`

            return client.query(queryText, [gameInstance.id])
        }))
        //results is an array, each index is a different array that has rows with a game instance in it
        //loop of results at each index, each has .rows (spread)        
        const games = results.map( result => {
            const gameInstance = result.rows[0]
            const players = []
            result.rows.map(user => {
                players.push({
                    users_id: user.users_id,
                    username: user.username,
                    players_name: user.players_name,
                    score: user.score,
                    is_winner: user.is_winner
                })
            })
            return {gameInstance, players}
        })
        
        await client.query('COMMIT')
        res.send(games)
    

    } catch {
        await client.query('ROLLBACK')
        console.log('Error GET /api/game', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
  });

router.get('/gameInstance/:gameInstanceId', (req, res) => {
    const queryText = `SELECT * FROM "game" 
    FULL JOIN "game_instance" ON game.id = game_instance.game_id
    FULL JOIN "players" ON game_instance.id = players.game_instance_id
    FULL JOIN "user" ON players.users_id = "user".id
    WHERE "game_instance".id = $1`

    pool.query(queryText, [req.params.gameInstanceId])
        .then(result => {
            console.log(result.rows)
            const gameInstance = result.rows[0];
            const players = [];
            result.rows.map(user => {
                players.push({
                    users_id: user.users_id,
                    username: user.username,
                    players_name: user.players_name,
                    score: user.score,
                    is_winner: user.is_winner
                })
            })
            const game = {gameInstance, players}
            res.send(game)
        }).catch(error => {
            console.log('Error getting game instance:', error);
            res.sendStatus(500);
        })
  });

router.post('/', async (req, res) => {
    //Calling sql and not hanging up
    const client = await pool.connect();
    console.log(req.body);
    try {
        const creator_id = req.user.id

        //tells sql to start transaction
        await client.query('BEGIN')

        const gameInstanceInsertResults = await client.query(`INSERT INTO "game_instance" ("creator_id", "game_id", "date_played", "creator_notes")
            VALUES ($1, $2, $3, $4)
            RETURNING "id"`, [creator_id, req.body.id, req.body.date_played, req.body.creator_notes])
        const game_instance_id = gameInstanceInsertResults.rows[0].id
        
        //Promise.all - there's an array of promises here, wait for all of them to be done.
        //insert const results =
        await Promise.all(req.body.players.map(player => {
            if (player.id) {
                const insertPlayerText = `INSERT INTO "players" ("users_id", "players_name", "game_instance_id", "score", "is_winner")
                VALUES ($1, $2, $3, $4, $5)`
                const insertLineItemValues = [player.id, player.username, game_instance_id, player.score, player.is_winner]
                return client.query(insertPlayerText, insertLineItemValues)
            } else { 
                const insertPlayerText = `INSERT INTO "players" ("players_name", "game_instance_id", "score", "is_winner")
                VALUES ($1, $2, $3, $4)`
                const insertLineItemValues = [player.players_name, game_instance_id, player.score, player.is_winner]
                return client.query(insertPlayerText, insertLineItemValues)
            }
        }));

        //made it through it all, lock it in
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        //we didn't make it all the way through, CANCEL, ABORT
        await client.query('ROLLBACK')
        console.log('Error POST /api/game', error);
        res.sendStatus(500);
    } finally {
        //hanging up the phone
        client.release()
    }
});

router.delete('/:gameInstanceId', (req, res) => {
    const queryText = `DELETE FROM "game_instance" WHERE id = $1 AND creator_id = $2`
    pool.query(queryText, [req.params.gameInstanceId, req.user.id])
        .then(response => {
            res.sendStatus(200)
        }).catch(error => {
            console.log('error deleting game:', error);
            res.sendStatus(500)            
        })
})

router.put('/:gameInstanceId', async (req, res) => {
    const client = await pool.connect();
    console.log(req.body);
    
    try {

        //tells sql to start transaction
        await client.query('BEGIN')
        await client.query(`UPDATE game_instance SET (date_played, creator_notes) = ($1, $2) 
        WHERE id = $3 AND creator_id = $4;`, [req.body.date_played, req.body.creator_notes, req.params.gameInstanceId, req.user.id]);
        
        //Promise.all - there's an array of promises here, wait for all of them to be done.
        //insert const results =
        await client.query('DELETE FROM players WHERE game_instance_id = $1', [req.params.gameInstanceId])

        await Promise.all(req.body.players.map(player => {
            if (player.users_id) {
                const insertPlayerText = `INSERT INTO "players" ("users_id", "players_name", "game_instance_id", "score", "is_winner")
                VALUES ($1, $2, $3, $4, $5)`
                const insertLineItemValues = [player.users_id, player.players_name, req.params.gameInstanceId, player.score, player.is_winner]
                return client.query(insertPlayerText, insertLineItemValues)
            } else { 
                const insertPlayerText = `INSERT INTO "players" ("players_name", "game_instance_id", "score", "is_winner")
                VALUES ($1, $2, $3, $4)`
                const insertLineItemValues = [player.players_name, req.params.gameInstanceId, player.score, player.is_winner]
                return client.query(insertPlayerText, insertLineItemValues)
            }
        }));

        //made it through it all, lock it in
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        //we didn't make it all the way through, CANCEL, ABORT
        await client.query('ROLLBACK')
        console.log('Error PUT /api/game', error);
        res.sendStatus(500);
    } finally {
        //hanging up the phone
        client.release()
    }
})

router.post('/updateDatabase', async (req, res) => {
    //Calling sql and not hanging up
    const client = await pool.connect();
    console.log(req.body);
    try {

        //tells sql to start transaction
        await client.query('BEGIN')

        //Promise.all - there's an array of promises here, wait for all of them to be done.
        //insert const results =
        await Promise.all(req.body.games.map(game => {

                const insertGameText = `INSERT INTO "game" ("bgaId", "name", "image_url", "url")
                VALUES ($1, $2, $3, $4)`
                const insertLineItemValues = [game.id, game.name, game.images.small, game.url]
                return client.query(insertGameText, insertLineItemValues)
        }));

        //made it through it all, lock it in
        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        //we didn't make it all the way through, CANCEL, ABORT
        await client.query('ROLLBACK')
        console.log('Error filling database!', error);
        res.sendStatus(500);
    } finally {
        //hanging up the phone
        client.release()
    }
});

router.get('/search/:queryString', (req, res) => {
    const queryText = `SELECT * FROM "game" WHERE "name" ILIKE '%' || $1 || '%' LIMIT 5;`
    console.log(req.params.queryString);
    
    pool.query(queryText, [req.params.queryString])
        .then(response => {
          res.send(response.rows)
        }
      ).catch(error => {
        console.log('Error in search:', error);    
      })
  })
module.exports = router;