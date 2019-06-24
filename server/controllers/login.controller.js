const User = require('../models/userModel');


exports.login = function (req, res) {
  User.findOne({
      userName: req.body.userName,
      password: req.body.password
    }).then(response => {
      if (response) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch(err => {
      res.send(err.message);
    });
};
