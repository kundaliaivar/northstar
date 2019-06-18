const FeedModel = require('../models/feedModel');

// exports.test = function(req, res){
//     res.send("Hello, its working! i am from goal controller :)");
//   }

const create=function(req,res){
    const feed = new FeedModel({
        goalId: req.body.goalId,
        feedId: req.body.feedId,
        userName : req.body.userName,
        feedBody : req.body.feedBody,
        createdOn : req.body.createdOn,
        stars: 0
    })
    feed.save()
    .then(Response=>{
        res.json(Response);
    })
    .catch(err=>res.status(400).send(err.message))
}

const like = function(req, res){
    //req.params.stars
    FeedModel.findOneAndUpdate({feedId:req.params.feedId},{ $inc:{stars:1} }, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("true");
    });
}

const edit = function(req, res){
    FeedModel.updateOne({
        feedId: req.params.feedId,
        feedBody : req.params.feedBody,
        createdOn : req.params.createdOn,
    })
    .then(Response=>{
        res.json(Response);
    })
    .catch(err=>res.status(400).send(err.message))
}


module.exports={create, like, edit};