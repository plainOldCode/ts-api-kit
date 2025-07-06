# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

## Core Project Configuration

- **Node.js Version**: `>=24.0.0`
- **Module System**: **ES Modules (ESM)**. All TypeScript import/export statements should use ESM syntax. Relative import paths **do not** need to include the `.js` extension due to `tsconfig-paths` configuration.
- **Import Paths**: Use relative imports without `.js` extensions (e.g., `import { User } from './entity/user'`)
- **Linter**: ESLint with Prettier, configured in `eslint.config.js` using ESM syntax
- **Database**: Requires MySQL version 8.x or higher with Prisma ORM

## Common Commands

### Build and Development

- `npm run build` - Compile TypeScript to JavaScript in `build/` directory
- `npm run build:watch` - Compile TypeScript in watch mode for development
- `npm run dev` - Start development server with nodemon (requires build first)
- `npm start` - Start production server from compiled build

### Testing

- `npm test` - Build project and run all tests on compiled JavaScript
- `npm run test:unit` - Build and run only service layer unit tests
- `npm run test:api` - Build and run only API integration tests
- `npm run test:watch` - Build and run tests in watch mode for development
- `npm run test:coverage` - Build and run tests with coverage reporting
- `npm run ci:test` - Full CI test pipeline (build, migrate test DB, run tests)

### Database Management

- `npm run db:generate` - Generate Prisma Client from schema
- `npm run db:migrate` - Create and apply new migration in development
- `npm run db:migrate:deploy` - Apply migrations to production database
- `npm run db:migrate:test` - Apply migrations to test database
- `npm run db:reset` - Reset database and apply all migrations
- `npm run db:studio` - Open Prisma Studio database browser
- `npm run db:init-test` - Initialize test database (requires MySQL running)

### Code Quality

- `npm run lint` - Run ESLint on all files
- `npm run clean` - Remove build directory
- `npm run prebuild` - Clean and lint before building

## Architecture Overview

- **Framework**: Fastify
- **Language**: TypeScript
- **ORM**: Prisma ORM with MySQL
- **Entry Point**: `src/index.ts` - Application bootstrap
- **Server Setup**: `src/server.ts` - Fastify server configuration with plugins
- **API Routes**: Organized under `src/api/v0/` with versioned endpoints (thin layer)
- **Database**: Prisma ORM with MySQL, schema defined in `prisma/schema.prisma`
- **Swagger Documentation**: Automatically generated and available at the `/documentation` endpoint.
