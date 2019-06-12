const GoalModel = require('../models/goalModel');

// exports.test = function(req, res){
//     res.send("Hello, its working! i am from goal controller :)");
//   }

const getGoal=function(req,res){
    // var goal = new GoalModel({
    //      name: 'goal2', 
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
    GoalModel.find()
    .then(Response=>{
        res.json(Response);
    })
    .catch(err=>res.status(400).send(err.message))
}


module.exports={getGoal};