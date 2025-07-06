// Ping endpoint schemas

export const pingSchemas = {
  ping: {
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
} as const;
