const Task = require('../models/task');

const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const taskId = await Task.create(title, description, status, dueDate);
        res.status(201).json({ message: 'Task created successfully', taskId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.getById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const updatedRows = await Task.update(req.params.id, title, description, status, dueDate);
        if (updatedRows === 0) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const deletedRows = await Task.delete(req.params.id);
        if (deletedRows === 0) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
