const TaskModel = require('../models/taskModel');

// Controller to create a task
const createTask = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const newTask = await TaskModel.create({ title, description, tags });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// Controller to edit a task
const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { title, description, tags },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Controller to delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

// Controller to fetch all tasks
const fetchTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};


module.exports = {
  createTask,
  editTask,
  deleteTask,
  fetchTasks,
};