 
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/build'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: ['build/**/*.js', '!build/**/*.d.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
};