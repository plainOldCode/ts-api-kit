import { commonSchemas } from './common.schemas';

// User entity schema
const userEntity = {
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
} as const;

// User query parameters
const userQueryParams = {
  type: 'object',
  properties: {
    page: { type: 'number', minimum: 1, default: 1 },
    limit: { type: 'number', minimum: 1, maximum: 100, default: 10 },
    state: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'DELETED'] },
    search: { type: 'string' },
  },
} as const;

// User creation body
const userCreateBody = {
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    description: { type: 'string' },
  },
} as const;

// User update body
const userUpdateBody = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    description: { type: 'string' },
    state: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'PENDING', 'DELETED'] },
  },
} as const;

// User ID parameter
const userIdParam = {
  type: 'object',
  properties: {
    id: { type: 'number' },
  },
  required: ['id'],
} as const;

export const userSchemas = {
  // GET /users
  getUsers: {
    tags: ['Users'],
    description: 'Get all users with pagination and filtering',
    querystring: userQueryParams,
    response: {
      200: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: userEntity,
          },
          pagination: commonSchemas.pagination,
        },
      },
    },
  },

  // GET /users/:id
  getUserById: {
    tags: ['Users'],
    description: 'Get user by ID',
    params: userIdParam,
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
      404: commonSchemas.error,
    },
  },

  // POST /users
  createUser: {
    tags: ['Users'],
    description: 'Create a new user',
    body: userCreateBody,
    response: {
      201: {
        type: 'object',
        properties: {
          data: userEntity,
          success: { type: 'boolean' },
        },
      },
    },
  },

  // PUT /users/:id
  updateUser: {
    tags: ['Users'],
    description: 'Update a user',
    params: userIdParam,
    body: userUpdateBody,
    response: {
      200: {
        type: 'object',
        properties: {
          data: userEntity,
          success: { type: 'boolean' },
        },
      },
    },
  },

  // DELETE /users/:id
  deleteUser: {
    tags: ['Users'],
    description: 'Delete a user',
    params: userIdParam,
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          success: { type: 'boolean' },
        },
      },
    },
  },
} as const;
