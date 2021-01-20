DROP TABLE IF EXISTS projects CASCADE;
CREATE TABLE projects(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    collection_id INTEGER REFERENCES collections(id),
    title VARCHAR(255) NOT NULL,
    song_id INTEGER REFERENCES songs(id),
    notes TEXT
);
