const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/createTask', taskController.createTask);
router.get('/fetchTask', taskController.fetchTask);
router.get('/fetchPendingTask', taskController.fetchPendingTask);
router.get('/fetchCompletedTask', taskController.fetchCompletedTask);




module.exports = router;