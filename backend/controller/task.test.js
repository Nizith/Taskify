// tests/task.controller.test.js
const { createTask, getAllTasks } = require('./task');
const httpMocks = require('node-mocks-http');

jest.mock('../models/task', () => ({
    create: jest.fn(() => Promise.resolve(1)),
    getAll: jest.fn(() => Promise.resolve([{ id: 1, title: 'Test Task' }]))
}));

describe('Task Controller', () => {
    it('should create a task successfully', async () => {
        const req = httpMocks.createRequest({ body: { title: 'Test Task' } });
        const res = httpMocks.createResponse();
        await createTask(req, res);
        expect(res.statusCode).toBe(201);
    });
});