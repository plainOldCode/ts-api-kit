module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/migration/**',
  ],
  moduleNameMapping: {
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@entity/(.*)': '<rootDir>/src/entity/$1',
    '@data-source': '<rootDir>/src/data-source/index.ts',
    '@server': '<rootDir>/src/server.ts',
  },
};