import { FastifyInstance, FastifyPluginAsync } from 'fastify';

const users: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get(
    '/users',
    {
      schema: {
        tags: ['Users'],
        description: 'Get all users',
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                email: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                state: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const users = await server.db.user.findMany({
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            state: true,
            created_at: true,
            updated_at: true,
          },
        });
        return reply.code(200).send(users);
      } catch (error) {
        server.log.error(error);
        return reply.code(500).send({ error: 'Internal Server Error' });
      }
    }
  );

  server.get(
    '/users/:id',
    {
      schema: {
        tags: ['Users'],
        description: 'Get user by ID',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
          required: ['id'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              state: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
            },
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params as { id: number };
        const user = await server.db.user.findUnique({
          where: { id },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            state: true,
            created_at: true,
            updated_at: true,
          },
        });

        if (!user) {
          return reply.code(404).send({ error: 'User not found' });
        }

        return reply.code(200).send(user);
      } catch (error) {
        server.log.error(error);
        return reply.code(500).send({ error: 'Internal Server Error' });
      }
    }
  );
};

export default users;
