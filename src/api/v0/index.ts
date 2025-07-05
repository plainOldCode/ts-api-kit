import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import ping from './ping';
import users from './users';

const IndexRoute: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.register(ping, options);
  server.register(users, options);
};

export default fp(IndexRoute);
