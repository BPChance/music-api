const pool = require('../db/index.js');

// get songs in an album from db
const getSongsInAlbum = async (albumId, limit, offset) => {
  const query = `
    SELECT s.song_id, s.title, s.duration, s.genre 
    FROM songs s
    WHERE s.album_id = $1
    ORDER BY s.title
    LIMIT $2 OFFSET $3`;
  const values = [albumId, limit, offset];
  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = { getSongsInAlbum };
