import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { BaseError } from '../errors';
import { Prisma } from '@prisma/client';

interface ErrorResponse {
  success: boolean;
  error: string;
  statusCode: number;
  timestamp: string;
  path: string;
  details?: unknown;
}

export const errorHandler = fp(async (server: FastifyInstance) => {
  server.setErrorHandler(async (error: Error, request: FastifyRequest, reply: FastifyReply) => {
    const timestamp = new Date().toISOString();
    const path = request.url;

    // Log the error
    server.log.error({
      error: error.message,
      stack: error.stack,
      url: request.url,
      method: request.method,
      params: request.params,
      query: request.query,
      body: request.body,
    });

    // Handle operational errors (BaseError instances)
    if (error instanceof BaseError) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: error.message,
        statusCode: error.statusCode,
        timestamp,
        path,
      };

      return reply.code(error.statusCode).send(errorResponse);
    }

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = error;
      let statusCode = 400;
      let message = 'Database error occurred';

      switch (prismaError.code) {
        case 'P2002':
          statusCode = 409;
          message = 'A record with this data already exists';
          break;
        case 'P2025':
          statusCode = 404;
          message = 'Record not found';
          break;
        case 'P2003':
          statusCode = 400;
          message = 'Foreign key constraint failed';
          break;
        default:
          message = 'Database operation failed';
      }

      const errorResponse: ErrorResponse = {
        success: false,
        error: message,
        statusCode,
        timestamp,
        path,
      };

      return reply.code(statusCode).send(errorResponse);
    }

    // Handle validation errors
    if (error.name === 'ValidationError' || error.message?.includes('validation')) {
      const errorResponse: ErrorResponse = {
        success: false,
        error: 'Validation failed',
        statusCode: 400,
        timestamp,
        path,
        details: error.message,
      };

      return reply.code(400).send(errorResponse);
    }

    // Handle generic errors
    const errorResponse: ErrorResponse = {
      success: false,
      error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
      statusCode: 500,
      timestamp,
      path,
      ...(process.env.NODE_ENV !== 'production' && { details: error.stack }),
    };

    return reply.code(500).send(errorResponse);
  });

  // Handle 404 errors
  server.setNotFoundHandler(async (request: FastifyRequest, reply: FastifyReply) => {
    const errorResponse: ErrorResponse = {
      success: false,
      error: `Route ${request.method} ${request.url} not found`,
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    return reply.code(404).send(errorResponse);
  });
});
