const User = require('../models/userModel');


exports.login = function (req, res) {

  // var user = new User({
  User.find({
      userName: req.body.userName,
      password: req.body.password
    }).then(response => {
      if (response.length)
        res.send(true);
      else
        res.send(false);
    })
    .catch(err => {
      res.send(err.message);
    })
}