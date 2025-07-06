import { DataState, User } from '@prisma/client';
import { UserDto, CreateUserDto, UpdateUserDto } from '../types';

// Test data factories for Prisma User model (includes all fields)
export const createMockPrismaUser = (overrides: Partial<User> = {}) => ({
  id: 1,
  name: 'John Doe',
  email: 'test@example.com',
  password: 'hashedpassword123',
  firstName: 'John',
  lastName: 'Doe',
  description: 'Test user description',
  state: DataState.ACTIVE,
  created_at: new Date('2023-01-01'),
  updated_at: new Date('2023-01-01'),
  ...overrides,
});

// Helper to convert Prisma user to UserDto format (what the service returns)
export const prismaUserToDto = (prismaUser: User): UserDto => ({
  id: prismaUser.id,
  email: prismaUser.email,
  firstName: prismaUser.firstName,
  lastName: prismaUser.lastName,
  state: prismaUser.state,
  created_at: prismaUser.created_at,
  updated_at: prismaUser.updated_at,
});

// Test data for UserDto (selected fields only)
export const createMockUser = (overrides: Partial<UserDto> = {}): UserDto => ({
  id: 1,
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  state: DataState.ACTIVE,
  created_at: new Date('2023-01-01'),
  updated_at: new Date('2023-01-01'),
  ...overrides,
});

export const createMockPrismaUserList = (count: number = 3) => {
  return Array.from({ length: count }, (_, index) =>
    createMockPrismaUser({
      id: index + 1,
      name: `User${index + 1} Test${index + 1}`,
      email: `user${index + 1}@example.com`,
      firstName: `User${index + 1}`,
      lastName: `Test${index + 1}`,
    })
  );
};

export const createMockUserList = (count: number = 3): UserDto[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockUser({
      id: index + 1,
      email: `user${index + 1}@example.com`,
      firstName: `User${index + 1}`,
      lastName: `Test${index + 1}`,
    })
  );
};

export const createMockCreateUserDto = (overrides: Partial<CreateUserDto> = {}): CreateUserDto => ({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  description: 'Test user',
  ...overrides,
});

export const createMockUpdateUserDto = (overrides: Partial<UpdateUserDto> = {}): UpdateUserDto => ({
  name: 'Updated Name',
  email: 'updated@example.com',
  firstName: 'Updated',
  lastName: 'User',
  ...overrides,
});

// Common test scenarios
export const testScenarios = {
  pagination: {
    page: 1,
    limit: 10,
    total: 25,
    totalPages: 3,
  },
  users: {
    active: createMockUser({ state: DataState.ACTIVE }),
    inactive: createMockUser({ id: 2, state: DataState.INACTIVE, email: 'inactive@example.com' }),
    deleted: createMockUser({ id: 3, state: DataState.DELETED, email: 'deleted@example.com' }),
  },
  prismaUsers: {
    active: createMockPrismaUser({ state: DataState.ACTIVE }),
    inactive: createMockPrismaUser({
      id: 2,
      state: DataState.INACTIVE,
      email: 'inactive@example.com',
    }),
    deleted: createMockPrismaUser({
      id: 3,
      state: DataState.DELETED,
      email: 'deleted@example.com',
    }),
  },
};
