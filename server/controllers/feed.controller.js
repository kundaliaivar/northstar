const FeedModel = require('../models/feedModel');

// exports.test = function(req, res){
//     res.send("Hello, its working! i am from goal controller :)");
//   }

const create = function (req, res) {
    console.log(req.body);
    const feed = new FeedModel(req.body);
    console.log('feed:', feed)
    feed.save()
        .then(Response => {
            console.log('***', Response);
            res.send(Response);
        })
        .catch(err => res.status(400).send(err.message))
}

const like = function (req, res) {
    //req.params.stars
    console.log('---*',req)
    FeedModel.findOneAndUpdate({ _id: req.params.feedId }, { $addToSet: { stars: [req.body.userName] } }, function (err, data) {
        console.log('--->', data);
        if (err) return res.send(500, { error: err });
        return res.send('true');
    });
}

const edit = function (req, res) {
    FeedModel.updateOne({
        _id: req.params.feedId
    }, { 
        feedBody: req.body.feedBody
    })
        .then(Response => {
            res.send('Success');
        })
        .catch(err => res.status(400).send(err.message))
}

const listFeed = function (req, res) {
    FeedModel.find({
        goalId: req.params.goalId
    }).then(response => {
        res.send(response);
    }).catch(err => res.status(400).send(err.message))
}


module.exports = { create, like, edit, listFeed };
