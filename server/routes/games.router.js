const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/myGames', (req, res) => {
  const users_id = req.user.id
  const requested_id = req.params.id
  const queryText = `SELECT * FROM "game" 
  FULL JOIN "game_instance" ON game.id = game_instance.game_id
  FULL JOIN "players" ON game_instance.id = players.game_instance_id
  FULL JOIN "user" ON players.users_id = "user".id
  WHERE "players".users_id = $1`

  pool.query(queryText, [users_id]).then(results => {
      res.send(results.rows)
  }).catch(error => {
      console.log('error in getting games', error);
  })
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
        GROUP BY game_instance.id HAVING count("players".users_id) = 2;`

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



router.post('/', async (req, res) => {
    //Calling sql and not hanging up
    const client = await pool.connect();
    console.log(req.body);
    try {
        const creator_id = req.user.id
        const {
            note,
            date,
            players
        } = req.body
        const {
            bgaId,
            name,
            images,
            url
        } = req.body.game

        //tells sql to start transaction
        await client.query('BEGIN')
        const gameInsertResults = await client.query(`INSERT INTO "game" ("bgaId", "name", "image_url", "url")
            VALUES ($1, $2, $3, $4)
            RETURNING "id";`, [bgaId, name, images.small, url]);
        const game_id = gameInsertResults.rows[0].id

        const gameInstanceInsertResults = await client.query(`INSERT INTO "game_instance" ("creator_id", "game_id", "date_played", "creator_notes")
            VALUES ($1, $2, $3, $4)
            RETURNING "id"`, [creator_id, game_id, date, note])
        const game_instance_id = gameInstanceInsertResults.rows[0].id
        
        //Promise.all - there's an array of promises here, wait for all of them to be done.
        //insert const results =
        await Promise.all(players.map(player => {
            if (player.userId) {
                const insertPlayerText = `INSERT INTO "players" ("users_id", "players_name", "game_instance_id", "score", "is_winner")
                VALUES ($1, $2, $3, $4, $5)`
                const insertLineItemValues = [player.userId, player.players_name, game_instance_id, player.score, player.is_winner]
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

module.exports = router;