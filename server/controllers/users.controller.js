const User = require('../models/userModel');


const userList = (req, res) => {
    User.find()
    .then(response => {
        if (response && response.length) {
            const users = response.map(user => user.userName);
            res.send({
                data: users,
                count: users.length
            });
        } else {
            res.send({
                error: 'Unable to fetch userlist'
            });
        }
    })
    .catch(err => {
        res.send(err.message);
    });
};

module.exports = { userList };
