import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import ping from './ping.js';
import users from './users.js';

const IndexRoute: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.register(ping, options);
  server.register(users, options);
};

export default fp(IndexRoute);
