const express = require('express');

const router = express.Router();

const login_controller = require('../controllers/login.controller');
const goal_controller = require('../controllers/goal.controller');
const feed_controller = require('../controllers/feed.controller');
const notification_controller=require('../controllers/notification.controller');
const user_controller = require('../controllers/users.controller');

router.post('/login', login_controller.login);
router.get('/getGoals/:userId', goal_controller.getGoal);
router.get('/goal/:goalId', goal_controller.goalLandingDetail);
router.post('/createfeed', feed_controller.create);
router.put('/likefeed/:feedId', feed_controller.like);
router.put('/editfeed/:feedId', feed_controller.edit);
router.post('/createGoal', goal_controller.createGoal);
router.put('/editGoal/:goalId', goal_controller.editGoal);
router.delete('/deleteGoal/:goalId',goal_controller.deleteGoal);
router.post('/registerdevice', notification_controller.registerDevice);
router.post('/sendnotification', notification_controller.sendNotification);
router.get('/feed/:goalId', feed_controller.listFeed);
router.get('/users', user_controller.userList);
module.exports = router;
