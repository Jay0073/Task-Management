const express = require('express');
const {
  createTask,
  editTask,
  deleteTask,
  fetchTasks,
  filterTasks,
} = require('../controllers/taskController');

const router = express.Router();

// Route to create a task
router.post('/create', createTask);

// Route to edit a task
router.put('/edit/:id', editTask);

// Route to delete a task
router.delete('/delete/:id', deleteTask);

// Route to fetch all tasks
router.get('/fetch', fetchTasks);


module.exports = router;