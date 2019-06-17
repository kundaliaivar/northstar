const FeedModel = require('../models/feedModel');

// exports.test = function(req, res){
//     res.send("Hello, its working! i am from goal controller :)");
//   }

const create=function(req,res){
    const feed = new FeedModel({
        goalId: req.params.goalId,
        feedId: req.params.feedId,
        userName : req.params.userName,
        feedBody : req.params.feedBody,
        createdOn : req.params.createdOn,
        stars: 0
    })
    feed.save()
    .then(Response=>{
        res.json(Response);
    })
    .catch(err=>res.status(400).send(err.message))
}

const like = function(req, res){
    FeedModel.findOne({_id:req.params.goalId})
    .then(Response=>{
        res.json(Response);
    })
    .catch(err=>res.status(400).send(err.message))
}

const edit = function(req, res){
    FeedModel.updateOne({
        goalId: req.params.goalId,
        feedId: req.params.feedId,
        userName : req.params.userName,
        feedBody : req.params.feedBody,
        createdOn : req.params.createdOn,
        stars: 0
    })
    .then(Response=>{
        res.json(Response);
    })
    .catch(err=>res.status(400).send(err.message))
}


module.exports={create, like, edit};