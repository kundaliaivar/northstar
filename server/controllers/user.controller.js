const User = require('../models/userModel');

exports.registerDevice = function (req, res) {

    User.findOneAndUpdate({ userName: req.body.userName }, $addToSet: { deviceIds: req.body.deviceId } ,{new:true},(err,response)=>{
        if(err){
            res.status(400).send(err.message);
        }
        res.send({message:"device is successfully registered"});
    })
}