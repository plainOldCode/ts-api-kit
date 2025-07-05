# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Project Configuration

- **Node.js Version**: `>=24.0.0`
- **Module System**: **ES Modules (ESM)**. All TypeScript import/export statements should use ESM syntax. Relative import paths **do not** need to include the `.js` extension due to `tsconfig-paths` configuration.
- **Import Paths**: Use relative imports without `.js` extensions (e.g., `import { User } from './entity/user'`)
- **Linter**: ESLint with Prettier, configured in `eslint.config.js` using ESM syntax
- **Database**: Requires MySQL version 8.x or higher

## Common Commands

### Build and Development

- `npm run build` - Compile TypeScript to JavaScript in `build/` directory
- `npm run build:watch` - Compile TypeScript in watch mode for development
- `npm run dev` - Start development server with nodemon (requires build first)
- `npm start` - Start production server from compiled build

### Testing

- `npm test` - Run Jest tests directly on TypeScript source files
- `npm run ci:test` - Full CI test pipeline (build, migrate test DB, run tests)

### Database Management

- `npm run migrate:run` - Run TypeORM migrations for local environment
- `npm run migrate:run-test` - Run TypeORM migrations for test environment
- `npm run migrate:init-test` - Initialize test database (requires MySQL running)

### Code Quality

- `npm run lint` - Run ESLint on all files
- `npm run clean` - Remove build directory
- `npm run prebuild` - Clean and lint before building

## Architecture Overview

### Core Structure

This is a Fastify-based TypeScript API with TypeORM for database operations:

- **Entry Point**: `src/index.ts` - Application bootstrap
- **Server Setup**: `src/server.ts` - Fastify server configuration with plugins
- **Database**: TypeORM with MySQL, configured via `src/data-source/index.ts`
- **API Routes**: Organized under `src/api/v0/` with versioned endpoints
- **Entities**: TypeORM entities in `src/entity/` with base class inheritance

### Key Patterns

#### Import Strategy

The project uses standard TypeScript imports with relative paths:
- Use relative imports without file extensions: `import { User } from './entity/user'`
- TypeScript compiler handles path resolution and compiles to ES Modules
- No module aliases are used - all imports are explicit relative paths

#### Database Integration

- DataSource is initialized in `src/db-connection/index.ts` as a Fastify plugin
- Database connection is decorated onto the Fastify instance as `server.db`
- Entities extend `BaseEntity` class for common fields (id, timestamps)
- TypeORM configuration supports environment-specific databases (test vs local)

#### API Structure

- Routes are organized by version (`/api/v0/`)
- Each route file exports a Fastify plugin
- Main API index registers all route plugins
- Swagger documentation is auto-generated and available at `/documentation`

### Environment Configuration

The application uses environment variables for configuration:

- `NODE_ENV` - Controls database selection and server binding
- Database connection via `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`
- Port configuration via `PORT` (defaults to 3000)

### Build Process

1. Clean previous build (`npm run clean`)
2. Lint code (`npm run lint`)
3. Compile TypeScript to ES Modules (`tsc`)
4. Run from `build/` directory

The project compiles to ES Modules with standard `import` and `export` syntax.
