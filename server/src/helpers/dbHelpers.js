//  Where the query functionality will lie

module.exports = (db) => {
  // Gets all users
  const getUsers = () => {
      const query = {
          text: 'SELECT * FROM users',
      };

      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };
  // Finds user by email
  const getUserByEmail = email => {

      const query = {
          text: `SELECT * FROM users WHERE email = $1` ,
          values: [email]
      }

      return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
  }
  // Adds user to db
  const addUser = (firstName, email, password) => {
      const query = {
          text: `INSERT INTO users (first_name, email, password) VALUES ($1, $2, $3) RETURNING *` ,
          values: [firstName, email, password]
      }

      return db.query(query)
          .then(result => result.rows[0])
          .catch(err => err);
  }
  // Gets users by projects, unsure about functionality rn - not working
  const getUsersByProjects = () => {
      const query = {
          text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id`
      }

      return db.query(query)
          .then(result => result.rows)
          .catch(err => err);

  }

  // Gets users by collections, unsure about functionality rn - not working
  const getUsersByCollections = () => {
    const query = {
        text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
    FROM users
    INNER JOIN posts
    ON users.id = posts.user_id`
    }

    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);

  }
  // 
  const getSongByProject = () => {
    const query = {
        text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
    FROM users
    INNER JOIN posts
    ON users.id = posts.user_id`
    }

    return db.query(query)
        .then(result => result.rows)
        .catch(err => err);

  }

  return {
      getUsers,
      getUserByEmail,
      addUser,
      getUsersByProjects,
      getUsersByCollections, 
      getSongByProject
  };
};