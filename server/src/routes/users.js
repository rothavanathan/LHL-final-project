// const express = require('express');
// const router = express.Router();

// /* GET user info from db */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// /* POST user info from db */
// router.post('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
    getPostsByUsers
} = require('../helpers/dataHelpers');

module.exports = ({
    getUsers,
    getUserByEmail,
    addUser,
    getUsersPosts
}) => {
    /* GET users listing. */
    router.get('/', (req, res) => {
        getUsers()
            .then((users) => res.json(users))
            .catch((err) => res.json({
                error: err.message
            }));
    });

    // router.get('/posts', (req, res) => {
    //     getUsersPosts()
    //         .then((usersPosts) => {
    //             const formattedPosts = getPostsByUsers(usersPosts);
    //             res.json(formattedPosts);
    //         })
    //         .catch((err) => res.json({
    //             error: err.message
    //         }));
    // });

    router.post('/', (req, res) => {

        const {
            first_name,
            email,
            password
        } = req.body;

        getUserByEmail(email)
            .then(user => {

                if (user) {
                    res.json({
                        msg: 'Sorry, a user account with this email already exists'
                    });
                } else {
                    return addUser(first_name, email, password)
                }

            })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};