import { PrismaClient, User } from '@prisma/client';
import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended';

// Create a mock for PrismaClient
export const prismaMock = mockDeep<PrismaClient>();

// Helper to reset mocks between tests
export const resetMocks = () => {
  mockReset(prismaMock);
};

// Type for the mocked PrismaClient
export type MockPrisma = MockProxy<PrismaClient>;

// Type-safe mock helpers to avoid 'any' casting
// Note: These are examples for future use when Jest types are available in the environment

// Helper to safely cast mock values for Prisma operations
export const asMockUserArray = (users: unknown): User[] => users as User[];
export const asMockUser = (user: unknown): User => user as User;

// Specific type helpers for Prisma User operations
export type PrismaUserSelect = Pick<
  User,
  'id' | 'email' | 'firstName' | 'lastName' | 'state' | 'created_at' | 'updated_at'
>;
export type PrismaUserFull = User;
export type PrismaUserArray = User[];
export type PrismaUserSelectArray = PrismaUserSelect[];
