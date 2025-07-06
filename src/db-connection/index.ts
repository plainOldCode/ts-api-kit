import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

export const db = fp(async (server: FastifyInstance) => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    server.decorate('db', prisma);
    server.addHook('onClose', async () => {
      await prisma.$disconnect();
    });
  } catch (error) {
    server.log.error(error);
  }
});
