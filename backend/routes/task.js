const express = require('express');
const TaskController = require('../controller/task');

const router = express.Router();

// Create a task
router.post('/addtask', TaskController.createTask);

// Get all tasks
router.get('/alltasks', TaskController.getAllTasks);

// Get a single task by ID
router.get('/task/:id', TaskController.getTaskById);

// Update a task
router.put('/edittask/:id', TaskController.updateTask);

// Delete a task
router.delete('/deletetask/:id', TaskController.deleteTask);

module.exports = router;
