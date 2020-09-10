const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/user/:id', (req, res) => {
  const users_id = req.user.id
  const requested_id = req.params.id
  const queryText = `SELECT * FROM "game"
    JOIN "game_instance" WHERE "game`
});

router.post('/', async (req, res) => {
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

        await client.query('BEGIN')
        const gameInsertResults = await client.query(`INSERT INTO "game" ("bgaId", "name", "image_url", "url")
            VALUES ($1, $2, $3, $4)
            RETURNING "id";`, [bgaId, name, images.small, url]);
        const game_id = gameInsertResults.rows[0].id

        const gameInstanceInsertResults = await client.query(`INSERT INTO "game_instance" ("creator_id", "game_id", "date_played", "creator_notes")
            VALUES ($1, $2, $3, $4)
            RETURNING "id"`, [creator_id, game_id, date, note])
        const game_instance_id = gameInstanceInsertResults.rows[0].id

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

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/game', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});

module.exports = router;