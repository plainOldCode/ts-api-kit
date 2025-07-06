# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

- `npm test` - Run Jest tests directly on TypeScript source files
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

### Core Structure

This is a Fastify-based TypeScript API with Prisma ORM and modern service layer architecture:

- **Entry Point**: `src/index.ts` - Application bootstrap
- **Server Setup**: `src/server.ts` - Fastify server configuration with plugins
- **Database**: Prisma ORM with MySQL, schema defined in `prisma/schema.prisma`
- **API Routes**: Organized under `src/api/v0/` with versioned endpoints (thin layer)
- **Service Layer**: Business logic in `src/services/` with dependency injection
- **Error Handling**: Custom error classes and centralized error handling
- **Type Safety**: Comprehensive TypeScript interfaces and DTOs

### Key Patterns

#### Import Strategy

The project uses standard TypeScript imports with relative paths:
- Use relative imports without file extensions: `import { User } from './entity/user'`
- TypeScript compiler handles path resolution and compiles to ES Modules
- No module aliases are used - all imports are explicit relative paths

#### Service Layer Architecture

- **Separation of Concerns**: API routes handle HTTP, services handle business logic
- **Dependency Injection**: Services are registered via `src/services-plugin/index.ts`
- **Error Handling**: Custom error classes with proper HTTP status codes
- **Type Safety**: DTOs and interfaces for request/response validation
- **Service Registry**: Centralized service management in `src/services/service-registry.ts`

#### Database Integration

- PrismaClient is initialized in `src/db-connection/index.ts` as a Fastify plugin
- Database connection is decorated onto the Fastify instance as `server.db`
- Services access the database through dependency injection
- Models are defined in `prisma/schema.prisma` with automatic type generation
- Prisma configuration supports environment-specific databases (test vs local)

#### API Structure

- Routes are organized by version (`/api/v0/`) as thin HTTP layers
- Each route file exports a Fastify plugin
- Routes delegate business logic to service layer
- Centralized error handling via plugin
- Swagger documentation is auto-generated and available at `/documentation`
- Comprehensive request/response schemas with validation

### Environment Configuration

The application uses environment variables for configuration:

- `NODE_ENV` - Controls database selection and server binding
- Database connection via `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`
- Port configuration via `PORT` (defaults to 3000)

### Build Process

1. Clean previous build (`npm run clean`)
2. Lint code (`npm run lint`)
3. Generate Prisma Client (`npm run db:generate`)
4. Compile TypeScript to ES Modules (`tsc`)
5. Run from `build/` directory

The project compiles to ES Modules with standard `import` and `export` syntax. Prisma Client generation is included in the prebuild step to ensure type-safe database access.

## Directory Structure

```
src/
├── api/v0/              # HTTP route handlers (thin layer)
├── services/            # Business logic layer
│   ├── user.service.ts  # User-related business operations
│   └── service-registry.ts # Service dependency injection
├── services-plugin/     # Fastify plugin for service injection
├── types/               # TypeScript interfaces and DTOs
│   ├── user.types.ts    # User-related type definitions
│   └── common.types.ts  # Shared type definitions
├── errors/              # Custom error classes
│   ├── base.error.ts    # Base error class
│   └── user.errors.ts   # User-specific errors
├── plugins/             # Fastify plugins
│   └── error-handler.ts # Centralized error handling
├── db-connection/       # Database connection setup
└── swagger/             # API documentation setup

prisma/
├── schema.prisma        # Database schema definition
└── migrations/          # Database migration files
```
