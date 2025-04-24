const pool = require('../db/index.js');

// get artist info from db
const getArtistInfo = async (artistName) => {
  const result = await pool.query('SELECT * FROM artists WHERE name = $1', [
    artistName,
  ]);
  return result.rows[0];
};

// get albums by artist from db
const getArtistAlbums = async (artistName) => {
  const result = await pool.query(
    'SELECT * FROM albums WHERE artist_id = (SELECT artist_id FROM artists WHERE name = $1)',
    [artistName]
  );
  return result.rows;
};

module.exports = { getArtistInfo, getArtistAlbums };
