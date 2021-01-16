// Here we will not be getting posts but rather collections and projects, currently incomplete

const getProjectsByUsers = (usersPosts) => {
  const postsByUsers = {};

  for (let post of usersPosts) {
      if (!postsByUsers[post.user_id]) {
          postsByUsers[post.user_id] = {
              userId: post.user_id,
              firstName: post.first_name,
              lastName: post.last_name,
              email: post.email,
              posts: [],
          };
      }

      postsByUsers[post.user_id].posts.push({
          title: post.title,
          content: post.content,
      });

  }

  return Object.values(postsByUsers);
};

const getCollectionsByUsers = (usersPosts) => {
  const postsByUsers = {};

  for (let post of usersPosts) {
      if (!postsByUsers[post.user_id]) {
          postsByUsers[post.user_id] = {
              userId: post.user_id,
              firstName: post.first_name,
              lastName: post.last_name,
              email: post.email,
              posts: [],
          };
      }

      postsByUsers[post.user_id].posts.push({
          title: post.title,
          content: post.content,
      });

  }

  return Object.values(postsByUsers);
};

module.exports = {
  getProjectsByUsers,
  getCollectionsByUsers
};