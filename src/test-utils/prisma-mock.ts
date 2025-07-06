import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended';

// Create a mock for PrismaClient
export const prismaMock = mockDeep<PrismaClient>();

// Helper to reset mocks between tests
export const resetMocks = () => {
  mockReset(prismaMock);
};

// Type for the mocked PrismaClient
export type MockPrisma = MockProxy<PrismaClient>;
