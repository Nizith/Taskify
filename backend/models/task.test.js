// tests/task.model.test.js
const Task = require('./task');

describe('Task Model', () => {
    it('should create a task', async () => {
        const taskId = await Task.create('Test Task', 'Description', 'pending', new Date());
        expect(taskId).toBeDefined();
    });

    it('should get all tasks', async () => {
        const tasks = await Task.getAll();
        expect(Array.isArray(tasks)).toBe(true);
    });
});
