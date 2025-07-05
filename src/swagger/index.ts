import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { port } from '../server.js';

const getHost = (publicUrl: string) => {
  if (['local', 'test'].includes(process.env.NODE_ENV as string)) return '127.0.0.1';
  const domain = publicUrl;
  return domain.replace(/(^\w+:|^)\/\//, '');
};

const getPort = () => (['local', 'test'].includes(process.env.NODE_ENV as string) ? port : 443);
const getSchemes = () =>
  ['local', 'test'].includes(process.env.NODE_ENV as string) ? 'http' : 'https';

export const swagger: FastifyPluginAsync = fp(async (server: FastifyInstance) => {
  await server.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Fastify TypeScript Starter API',
        description: 'A starter API built with Fastify, TypeScript, and TypeORM',
        version: '1.0.0',
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
      host: `${getHost('localhost')}:${getPort()}`,
      schemes: [getSchemes()],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    hideUntagged: true,
  });

  await server.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    transformSpecificationClone: true,
  });
});
