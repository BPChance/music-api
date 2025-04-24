const express = require('express');
const router = express.Router();
const { getArtistInfo, getArtistAlbums } = require('../models/artistModel');
const logger = require('../utils/logger');

/**
 * @swagger
 * /artist:
 *   get:
 *     summary: Get information about an artist
 *     parameters:
 *       - in: query
 *         name: artist_name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the artist
 *         example: "Nai Palm"
 *     responses:
 *       200:
 *         description: Artist information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 artist_id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Nai Palm"
 *                 biography:
 *                   type: string
 *                   example: "Nai Palm was born Naomi Grace Saalfield on May 15, 1989 i\nn Melbourne, Australia. She and her five siblings were raised by their single mother, a choreographer and painter. Saalfield was first\nintroduced to music by her mother, playing piano and listening to soul, flamenco, and Northwest African music."
 *                 genre:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["R&B", "Soul"]
 *       400:
 *         description: Missing artist_name parameter
 *       404:
 *         description: Artist not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /artist/albums:
 *   get:
 *     summary: Get albums of a specific artist
 *     parameters:
 *       - in: query
 *         name: artist_name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the artist
 *         example: "Nai Palm"
 *     responses:
 *       200:
 *         description: List of albums by the artist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 artist:
 *                   type: string
 *                   example: "Nai Palm"
 *                 albums:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       album_id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Needle Paw"
 *                       artist_id:
 *                         type: integer
 *                         example: 1
 *                       release_date:
 *                         type: string
 *                         format: date
 *                         example: "2017-10-20"
 *       400:
 *         description: Missing artist_name parameter
 *       404:
 *         description: No albums found for this artist
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req, res) => {
  const artistName = req.query.artist_name;
  if (!artistName) {
    logger.warn('Missing artist_name parameter', {
      route: req.originalUrl,
      query: req.query,
    });
    return res.status(400).json({ error: 'Missing artist_name parameter' });
  }

  try {
    const artist = await getArtistInfo(artistName);
    if (!artist) {
      logger.warn('Artist not found', { artistName });
      return res.status(404).json({ error: 'Artist not found' });
    }

    logger.info('fetching artist info', {
      artistName: artist.name,
      route: req.originalUrl,
      method: req.method,
    });
    res.json(artist);
  } catch (err) {
    logger.error('Error fetching artist info', {
      error: err.message,
      stack: err.stack,
      artistName,
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/albums', async (req, res) => {
  const artistName = req.query.artist_name;
  if (!artistName) {
    logger.warn('Missing artist_name parameter', {
      route: req.originalUrl,
      query: req.query,
    });
    return res.status(400).json({ error: 'Missing artist_name parameter' });
  }

  try {
    const albums = await getArtistAlbums(artistName);
    if (!albums || albums.length === 0) {
      logger.warn('No albums found for artist', { artistName });
      return res.status(404).json({ error: 'No albums found for this artist' });
    }
    logger.info('fetching artist albums', {
      artistName,
      albumsCount: albums.length,
    });
    res.json({ artist: artistName, albums });
  } catch (err) {
    logger.error('Error fetching artist albums', {
      error: err.message,
      stack: err.stack,
      artistName,
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
