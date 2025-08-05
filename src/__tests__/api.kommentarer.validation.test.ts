import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/kommentarer';

describe('/api/kommentarer API', () => {
  it('should return 400 if namn or text is missing', async () => {
    const req = createMocks({
      method: 'POST',
      body: { namn: '', text: '' },
    }).req;
    const res = createMocks().res;

    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
    const data = res._getJSONData();
    expect(data).toHaveProperty('error');
    expect(data.error).toMatch(/Namn och text krävs/);
  });
});
