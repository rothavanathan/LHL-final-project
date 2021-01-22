const bcrypt = require("bcrypt");

const getSongsBySearch = (search, db) => {

  const query =
    `SELECT * FROM songs
    WHERE artist ILIKE $1;`;
  console.log(query)
  return db.query(query, [search]);
}

const getUserByEmail = (email, db) => {
  const query = `
          SELECT * FROM users
          WHERE email = $1;
        `
  const values = [email]
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
        ORDER BY user_id desc;
      `;

  return db.query(query);
};

const addNoteToProject = (notes, collection_id, project_id, db) => {
  const query = {
    text: `
      UPDATE projects
      SET notes = $1, collection_id = $2
      WHERE id = $3
      RETURNING *;
      `,
    values: [notes, collection_id, project_id],
  };

  return db.query(query)
};

const getProjectsByCollection = (id, db) => {
  const query = {
    text: `
        SELECT projects.id as project_id, projects.title as project_title, songs.*, collections.name as collection_name
        FROM projects
        JOIN songs on projects.song_id = songs.id
        JOIN collections on projects.collection_id = collections.id
        WHERE collections.id = $1
        ORDER BY collections.id desc;
      `,
    values: [id],
  };

  return db
    .query(query)
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
  const query = {
    text: `
        SELECT *
        FROM stems
        WHERE song_id = $1;
      `,
    values: [id],
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

const addUser = (first_name, email, hashedPassword, db) => {
  const query = `
          INSERT INTO users (first_name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;

  return db.query(query, [first_name, email, hashedPassword]);
};

const addProject = (title, song_id, user_id, db) => {
  const query = {
    text: `
        INSERT INTO projects (title, song_id, user_id, notes)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
    values: [title, song_id, user_id, ""],
  };

  return db.query(query)
};

const deleteProject = (id, db) => {
  const query = {
    text: `
        DELETE FROM projects
        WHERE id = $1;
        `,
    values: [id],
  };

  return db.query(query)
};

// Add song to a project
const addSongToProject = (title, user_id, db) => {
  const query = {
    text: `
        INSERT INTO songs (title, user_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
    values: [title, user_id],
  };

  return db
    .query(query)
    .then((result) => result.rows[0])
    .catch((err) => err);
};

const addCollection = (name, thumbnail, userId, db) => {
  const query = {
    text: `
        INSERT INTO collections (name, thumbnail, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
    values: [name, thumbnail, userId],
  };

  return db
    .query(query)
    .then((result) => result.rows[0])
    .catch((err) => err);
};

const addExistingProjectToCollection = (collectionId, projectId, db) => {
  const query = {
    text: `
        UPDATE projects
        SET collection.id = $1
        WHERE id = $2;
        `,
    values: [collectionId, projectId],
  };

  return db
    .query(query)
    .then((result) => result.rows[0])
    .catch((err) => err);
};

const login = (email, passwordInput, database) => {
  return getUserWithEmail(email, database).then((rows) => {
    if (bcrypt.compareSync(passwordInput, rows[0].password)) {
      return Promise.resolve(rows);
    } else {
      return Promise.reject(null);
    }
  });
};

const getUserWithEmail = (email, database) => {
  return database
    .query(
      `
    SELECT users.* FROM users
    WHERE users.email = $1
    `,
      [email]
    )
    .then((res) => {
      return res.rows.length > 0
        ? Promise.resolve(res.rows)
        : Promise.reject(`no user with that email`);
    });
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
  addExistingProjectToCollection,
  login,
  addNoteToProject,
  deleteProject
};
