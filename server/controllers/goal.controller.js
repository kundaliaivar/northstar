const GoalModel = require('../models/goalModel');

// exports.test = function(req, res){
//     res.send("Hello, its working! i am from goal controller :)");
//   }

const getGoal = function (req, res) {
    // var goal = new GoalModel({
    //      name: 'goal3', 
    //      description: '...', 
    //      createdBy:{userId:'11232',userName:'ravi'},
    //      createdFor:{userId:'232323',userName:'john'},
    //      taskType:'CC',
    //      isHighImpact:false,
    //      isPublic:true,
    //      dueOn:'2019-06-20T04:18:21.931Z',
    //      lastUpdateOn:'2019-06-12T04:18:21.931Z',
    //      createdOn:'2019-06-11T04:18:21.931Z',
    //      isCompleted:false,
    //      percentage:30
    //     });
    //     goal.save().then(result=>res.send(result)).catch(err=>res.status(400).send(err.message));
    GoalModel.find({ 'createdFor.userId': req.params.userId })
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err.message);
    });
};

const goalLandingDetail = (req, res) => {
    GoalModel.findOne({ _id: req.params.goalId })
    .then(Response => {
        res.json(Response);
    })
    .catch(err => res.status(400).send(err.message));
};

const createGoal = (req, res) => {
    const reqBody = req.body;
    const newGoal = new GoalModel(reqBody);
    
    newGoal.save()
    .then(() => {
        res.send('Success');
    })
    .catch(err => res.status(400).send(err.message));
};

const editGoal = (req, res) => {
    const reqBody = req.body;
    const newGoal = new GoalModel(reqBody);
    
    newGoal.updateOne({
        _id: req.params.goalId
    }, { 
        name: reqBody.name,
        description: reqBody.description,
        createdBy: reqBody.createdBy,
        createdFor: reqBody.createdFor,
        isHighImpact: reqBody.isHighImpact,
        isPublic: reqBody.isPublic,
        lastUpdateOn: Date.now,
        isCompleted: reqBody.isCompleted,
        percentage: reqBody.percentage,
    }).then(() => {
        res.send('Success');
    })
    .catch(err => res.status(400).send(err.message));
};


module.exports = { getGoal, goalLandingDetail, createGoal, editGoal };
