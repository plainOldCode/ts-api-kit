import { FastifyInstance, FastifyPluginAsync } from 'fastify';

const ping: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get(
    '/ping',
    {
      schema: {
        tags: ['Health'],
        description: 'Health check endpoint',
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              timestamp: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return reply.code(200).send({
        message: 'pong',
        timestamp: new Date().toISOString(),
      });
    }
  );
};

export default ping;
