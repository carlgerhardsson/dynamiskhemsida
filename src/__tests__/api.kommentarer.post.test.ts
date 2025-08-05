import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/kommentarer';

describe('/api/kommentarer API', () => {
  it('should save and return latest comments on POST', async () => {
    const req = createMocks({
      method: 'POST',
      body: { namn: 'Testare', text: 'Detta är en testkommentar.' },
    }).req;
    const res = createMocks().res;

    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    const data = res._getJSONData();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('namn', 'Testare');
    expect(data[0]).toHaveProperty('text', 'Detta är en testkommentar.');
  });
});
