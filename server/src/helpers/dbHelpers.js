const getSongsBySearch = (search, db) => {
  const query = `SELECT * FROM songs
    WHERE artist ILIKE $1;`;

  return db.query(query, [search]);
};

const getUserByEmail = (email, db) => {
  const query = `
          SELECT * FROM users
          WHERE email = $1;
        `;
  const values = [email];
  return db.query(query, values);
};

const getCollectionsByUser = (id, db) => {
  const query = `
      SELECT * FROM collections
      WHERE user_id = ${id}
      ORDER BY collections.id desc;
      `;

  return db.query(query);
};

const getProjectsByUser = (id, db) => {
  const query = `
        SELECT projects.*, songs.url_album_artwork, songs.title as song_title, songs.artist
        FROM projects
        JOIN songs ON projects.song_id = songs.id
        WHERE user_id = ${id}
        ORDER BY projects.id desc;
      `;

  return db.query(query);
};

const addNoteAndCollectionToProject = (
  notes,
  collection_id,
  project_id,
  db
) => {
  const query = `
      UPDATE projects
      SET notes = $1, collection_id = $2
      WHERE id = $3
      RETURNING *;
      `;

  const values = [notes, collection_id, project_id];
  return db.query(query, values);
};

const getProjectsByCollection = (id, db) => {
  const query = `
        SELECT projects.id as project_id, projects.title as project_title, songs.*, collections.name as collection_name
        FROM projects
        JOIN songs on projects.song_id = songs.id
        JOIN collections on projects.collection_id = collections.id
        WHERE collections.id = $1
        ORDER BY collections.id desc;
      `;

  const values = [id];
  return db
    .query(query, values)
    .then((result) => result.rows)
    .catch((err) => err);
};

const getSongByProject = (id, db) => {
  const query = `SELECT projects.*, projects.title as project_title, songs.*, stems.*
      FROM projects
      JOIN songs ON projects.song_id = songs.id
      JOIN stems ON songs.id = stems.song_id
      WHERE projects.id = ${id};`;

  return db.query(query);
};

const getStemsBySong = (id, db) => {
  const query = `
        SELECT *
        FROM stems
        WHERE song_id = $1;
      `;

  const values = [id];
  return db
    .query(query, values)
    .then((result) => result.rows)
    .catch((err) => err);
};

const addUser = (first_name, email, hashedPassword, db) => {
  const query = `
          INSERT INTO users (first_name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;

  const values = [first_name, email, hashedPassword];
  return db.query(query, values);
};

const addProject = (title, song_id, user_id, db) => {
  const query = `
        INSERT INTO projects (title, song_id, user_id, notes)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;

  const values = [title, song_id, user_id, ""];
  return db.query(query, values);
};

const deleteProject = (id, db) => {
  const query = `
        DELETE FROM projects
        WHERE id = $1;
        `;

  const values = [id];
  return db.query(query, values);
};

const deleteCollection = (id, db) => {
  const query = `
        DELETE FROM collections
        WHERE id = $1;
        `;

  const values = [id];
  return db.query(query, values);
};

const updateProjectCollectionId = (id, db) => {
  const query = `
        UPDATE projects
        SET collection_id = $1
        WHERE collection_id = $2;
        `;

  const values = [null, id];
  return db.query(query, values);
};

const addSongToProject = (title, user_id, db) => {
  const query = `
        INSERT INTO songs (title, user_id)
        VALUES ($1, $2)
        RETURNING *;
        `;

  const values = [title, user_id];
  return db
    .query(query, values)
    .then((result) => result.rows[0])
    .catch((err) => err);
};

const addCollection = (name, thumbnail, userId, db) => {
  const query = `
        INSERT INTO collections (name, thumbnail, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;
  const values = [name, thumbnail, userId];
  return db
    .query(query, values)
    .then((result) => result.rows[0])
    .catch((err) => err);
};

module.exports = {
  getUserByEmail,
  getCollectionsByUser,
  getProjectsByUser,
  getProjectsByCollection,
  getSongByProject,
  getStemsBySong,
  getSongsBySearch,
  addUser,
  addProject,
  addCollection,
  addNoteAndCollectionToProject,
  deleteProject,
  deleteCollection,
  updateProjectCollectionId,
};