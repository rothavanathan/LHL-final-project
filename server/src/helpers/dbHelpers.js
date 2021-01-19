const bcrypt = require('bcrypt')
const getUserByEmail = (email, db) => {
    const query = {
        text:
        `
          SELECT * FROM users
          WHERE email = $1;
        `,
        values: [email]
    };

    return db
        .query(query)

};

const getCollectionsByUser = (id, db) => {
  const query = {
      text: `
      SELECT * FROM collections
      WHERE user_id = $1;
      `,
      values: [id]
  }

  return db.query(query)
      .then(result => {
        if (result.rows.length > 0) {
          return Promise.resolve(result.rows)
        } else {
          return Promise.reject(`no result from query`)
        }
      })
      .catch(err => err);

}

const getProjectsByUser = (id, db) => {
  const query = {
      text: `
        SELECT *
        FROM projects
        WHERE user_id = $1;
      `,
      values: [id]
  }

  return db.query(query)
      .then(result => result.rows)
      .catch(err => err);

}

const getProjectsByCollection = (id, db) => {
  const query = {
      text: `
        SELECT *
        FROM projects
        JOIN users on projects.user_id = users.id
        WHERE users.id = $1;
      `,
      values: [id]
  }

  return db.query(query)
      .then(result => result.rows)
      .catch(err => err);

}

const getSongByProject = (id, db) => {
  const query = {
      text:
      `
        SELECT *
        FROM songs
        WHERE project_id = $1;
      `,
      values: [id]
  };

  return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
};

const getStemsBySong = (id, db) => {
  const query = {
      text:
      `
        SELECT *
        FROM stems
        WHERE song_id = $1;
      `,
      values: [id]
  };

  return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
};

// Adds user to db
const addUser = (first_name, email, hashedPassword, db) => {
    const query = `
          INSERT INTO users (first_name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;
        ` 

    return db
      .query(query, [first_name, email, hashedPassword])
}

const addProject = (notes, title, userId, collectionsId, db) => {
  const query = {
      text: `
        INSERT INTO projects (notes, title, user_id, collections_id)
        VALUES ($1, $2, $3, 4)
        RETURNING *;
        `,
      values: [notes, title, userId, collectionsId]
  }

  return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
}

const addCollection = (name, thumbnail, userId, db) => {
  const query = {
      text: `
        INSERT INTO collections (name, thumbnail, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      values: [name, thumbnail, userId]
  }

  return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
}

const addExistingProjectToCollection = (collectionId, projectId, db) => {
  const query = {
      text: `
        UPDATE projects
        SET collection.id = $1
        WHERE id = $2;
        `,
      values: [collectionId, projectId]
  }

  return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
}

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
    addUser,
    addProject,
    addCollection,
    addExistingProjectToCollection, 
    login
};

