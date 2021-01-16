DROP TABLE IF EXISTS songs CASCADE;
CREATE TABLE songs(
    id SERIAL PRIMARY KEY NOT NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    artist VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    album VARCHAR(255) NOT NULL,
    url_album_artwork VARCHAR(255),
    url_full_song_preview VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL
);