import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { ServiceRegistry } from '../services/service-registry';

export const services = fp(async (server: FastifyInstance) => {
  const serviceRegistry = new ServiceRegistry(server.db);

  server.decorate('services', {
    userService: serviceRegistry.userService,
  });
});
