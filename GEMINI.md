# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

## Core Project Configuration

- **Node.js Version**: `>=24.0.0`
- **Module System**: **ES Modules (ESM)**. All TypeScript import/export statements should use ESM syntax. Relative import paths **do not** need to include the `.js` extension due to `tsconfig-paths` configuration.
- **Linter**: ESLint with Prettier. The configuration is in `eslint.config.js` and uses ESM syntax.
- **Database**: Requires MySQL version 8.x or higher.

## Common Commands

### Build and Development

- `npm run build` - Compile TypeScript to JavaScript in the `build/` directory.
- `npm run dev` - Start the development server with `nodemon`, which watches for changes in the `build/` directory. Use `npm run build:watch` in a separate terminal.
- `npm start` - Start the production server from the compiled `build/` directory.

### Testing

- `npm test` - Run Jest tests.
- `npm run ci:test` - Run the full CI test pipeline, which includes building the project and running database migrations for the test environment.

### Database Management

- `npm run migrate:run` - Run TypeORM migrations for the local development database.
- `npm run migrate:run-test` - Run TypeORM migrations for the test database.

### Code Quality

- `npm run lint` - Run ESLint on all project files.
- `npm run clean` - Remove the `build/` directory.

## Architecture Overview

- **Framework**: Fastify
- **Language**: TypeScript
- **ORM**: TypeORM with `mysql2` driver.
- **Entry Point**: `src/index.ts` bootstraps the server.
- **Server Configuration**: `src/server.ts` sets up the Fastify server, plugins, and routes.
- **API Routes**: Versioned under `src/api/v0/`. Each route is a Fastify plugin.
- **Database Entities**: Defined in `src/entity/`.
- **Swagger Documentation**: Automatically generated and available at the `/documentation` endpoint.
