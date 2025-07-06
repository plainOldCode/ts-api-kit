import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { pingSchemas } from '../../schemas';

const ping: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get(
    '/ping',
    {
      schema: pingSchemas.ping,
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
