import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended';
import { UserDto } from '../types';

// Create a mock for PrismaClient
export const prismaMock = mockDeep<PrismaClient>();

// Helper to reset mocks between tests
export const resetMocks = () => {
  mockReset(prismaMock);
};

// Type for the mocked PrismaClient
export type MockPrisma = MockProxy<PrismaClient>;

// Type helpers for Prisma select operations that return UserDto-like objects
export type MockUserSelect = UserDto;
export type MockUserSelectArray = UserDto[];
export type MockPrismaUser = UserDto; // For single user mocks
export type MockPrismaUserArray = UserDto[]; // For user array mocks
