const GoalModel = require('../models/goalModel');

// exports.test = function(req, res){
//     res.send("Hello, its working! i am from goal controller :)");
//   }

const getGoal=function(req,res){
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
    GoalModel.find({"createdFor.userId":req.params.userId})
    .then(response=>{
        res.json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(400).send(err.message);
    })
}

const goalLandingDetail = function(req, res){
    GoalModel.findOne({_id:req.params.goalId})
    .then(Response=>{
        res.json(Response);
    })
    .catch(err=>res.status(400).send(err.message))
}

const createGoal=function (req,res) {
    const {
        name,
        description,
        createdBy,
        createdFor,
        taskType,
        isHighImpact,
        isPublic,
        dueOn,
        createdOn}=req.body
    var newGoal = new GoalModel({
        name,
        description,
        createdBy,
        createdFor,
        taskType,
        isHighImpact,
        isPublic,
        dueOn,
        createdOn});
    
    newGoal.save()
    .then(Response=>res.send("Success"))
    .catch(err=>res.status(400).send(err.message));
}


module.exports={getGoal, goalLandingDetail, createGoal};
