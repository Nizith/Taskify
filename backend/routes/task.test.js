const request = require('supertest');
const app = require('../server'); // Make sure to import your actual Express app

describe('Task Routes', () => {
    // Increase timeout if the task creation involves asynchronous operations
    jest.setTimeout(10000); // 10 seconds

    it('should create a task', async () => {
        // Mock the res object if needed, but supertest handles this
        const res = await request(app)
            .post('/addtask')
            .send({ title: 'New Task' });

        // Ensure response status is 201 (created)
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Task created successfully');
        // You can check for other properties if needed, like taskId
    });
    
});


