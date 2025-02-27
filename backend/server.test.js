const request = require('supertest');
const app = require('./server');

describe('Server API Endpoints', () => {
  // You can add global setup/teardown logic if needed

  afterAll(() => {
    // Ensures the app shuts down gracefully after the tests finish
    if (app && app.close) {
      app.close();
    }
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
  });
});
