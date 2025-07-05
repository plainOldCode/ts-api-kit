import { FastifyInstance, fastify } from 'fastify';
import ping from './ping';

describe('Ping API', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = fastify({ logger: false });
    await server.register(ping);
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  test('GET /ping should return pong', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/ping',
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('pong');
    expect(body.timestamp).toBeDefined();
  });
});
