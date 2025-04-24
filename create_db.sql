-- artist table
CREATE TABLE artists (
    artist_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    biography TEXT,
    genre VARCHAR(255) []
);

-- albums table
CREATE TABLE albums (
    album_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id INTEGER NOT NULL REFERENCES artists(artist_id) ON DELETE CASCADE,
    release_date DATE NOT NULL
);

-- songs table
CREATE TABLE songs (
    song_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    album_id INTEGER NOT NULL REFERENCES albums(album_id) ON DELETE CASCADE,
    duration INTEGER, -- in sec
    genre VARCHAR(255) []
);

-- indexes
CREATE INDEX idx_albums_artist_id ON albums(artist_id);
CREATE INDEX idx_songs_album_id ON songs(album_id);
CREATE INDEX idx_artist_genre ON artists USING gin (genre);
CREATE INDEX idx_album_release_date ON albums(release_date);
