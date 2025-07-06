import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { UserQueryOptions } from '../../types';
import { userSchemas } from '../../schemas';

const users: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get(
    '/users',
    {
      schema: userSchemas.getUsers,
    },
    async (request, reply) => {
      const queryOptions = request.query as UserQueryOptions;
      const result = await server.services.userService.getAllUsers(queryOptions);
      return reply.code(200).send(result);
    }
  );

  server.get(
    '/users/:id',
    {
      schema: userSchemas.getUserById,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      const user = await server.services.userService.getUserById(id);
      return reply.code(200).send({
        data: user,
        success: true,
      });
    }
  );

  // POST /users - Create a new user
  server.post(
    '/users',
    {
      schema: userSchemas.createUser,
    },
    async (request, reply) => {
      const userData = request.body as any;
      const user = await server.services.userService.createUser(userData);
      return reply.code(201).send({
        data: user,
        success: true,
      });
    }
  );

  // PUT /users/:id - Update a user
  server.put(
    '/users/:id',
    {
      schema: userSchemas.updateUser,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      const updateData = request.body as any;
      const user = await server.services.userService.updateUser(id, updateData);
      return reply.code(200).send({
        data: user,
        success: true,
      });
    }
  );

  // DELETE /users/:id - Delete a user
  server.delete(
    '/users/:id',
    {
      schema: userSchemas.deleteUser,
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      await server.services.userService.deleteUser(id);
      return reply.code(200).send({
        message: 'User deleted successfully',
        success: true,
      });
    }
  );
};

export default users;
