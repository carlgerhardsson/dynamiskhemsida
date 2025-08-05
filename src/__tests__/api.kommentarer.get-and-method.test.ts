import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/kommentarer';

describe('/api/kommentarer API', () => {
  it('should return the three latest comments on GET', async () => {
    const req = createMocks({ method: 'GET' }).req;
    const res = createMocks().res;

    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    const data = res._getJSONData();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeLessThanOrEqual(3);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('namn');
      expect(data[0]).toHaveProperty('text');
    }
  });

  it('should return 405 for unsupported methods', async () => {
    const req = createMocks({ method: 'PUT' }).req;
    const res = createMocks().res;

    await handler(req, res);
    expect(res._getStatusCode()).toBe(405);
  });
});
