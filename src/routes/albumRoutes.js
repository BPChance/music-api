const express = require('express');
const router = express.Router();
const { getSongsInAlbum } = require('../models/albumModel');
const logger = require('../utils/logger');

/**
 * @swagger
 * /albums/{album_id}/songs:
 *   get:
 *     summary: Get songs in a specific album
 *     parameters:
 *       - in: path
 *         name: album_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the album
 *     responses:
 *       200:
 *         description: List of songs in the album
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 album_id:
 *                   type: integer
 *                   example: 1
 *                 songs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       song_id:
 *                         type: integer
 *                         example: 2
 *                       title:
 *                         type: string
 *                         example: "Atari"
 *                       duration:
 *                         type: integer
 *                         description: Duration in seconds
 *                         example: 344
 *                       genre:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["R&B", "Soul"]
 *       404:
 *         description: No songs found for this album
 *       500:
 *         description: Server error
 */

router.get('/:album_id/songs', async (req, res) => {
  const albumId = req.params.album_id;

  const page = parseInt(req.query.page) || 1;
  const limit = 7;
  const offset = (page - 1) * limit;

  logger.info(`Received GET request to fetch songs for album ID: ${albumId}`);
  try {
    const songs = await getSongsInAlbum(albumId, limit, offset);
    if (!songs || songs.length === 0) {
      logger.warn('No songs found for album', { albumId });
      return res.status(404).json({ error: 'No songs found for this album' });
    }
    res.json({ album_id: albumId, page, limit, songs });
  } catch (err) {
    logger.error('Error fetching songs for album', {
      error: err.message,
      stack: err.stack,
      albumId,
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
