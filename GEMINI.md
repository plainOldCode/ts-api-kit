# GEMINI.md - Operational Guidelines for AI Agent

This document provides specific instructions and context for the AI agent (Gemini) to effectively understand, navigate, and modify this codebase.

## 1. Core Project Configuration & Conventions

*   **Node.js Version**: `>=24.0.0`. *Always ensure compatibility when suggesting or executing Node.js commands.*
*   **Module System**: **ES Modules (ESM)**. *All TypeScript import/export statements MUST use ESM syntax. When generating new code or modifying existing imports, adhere strictly to this. Relative import paths DO NOT need to include the `.js` extension.*
*   **Import Paths**: *Use relative imports without `.js` extensions (e.g., `import { User } from './entity/user'`). Do not introduce module aliases.*
*   **Linter**: ESLint with Prettier, configured in `eslint.config.js`. *Always run `npm run lint` after making changes and before proposing a commit.*
*   **Database**: MySQL version 8.x or higher with Prisma ORM. *When interacting with the database, always use Prisma ORM. Refer to `prisma/schema.prisma` for schema definitions.*

## 2. Common Operational Commands

*   **Build**: `npm run build` (compiles TypeScript to `build/`). *Execute this before running tests or starting the server in a production-like environment.*
*   **Lint**: `npm run lint`. *Crucial for maintaining code quality. Always run this after code modifications.*
*   **Test**: `npm test` (runs all tests on compiled JavaScript). *Always run tests after making changes to verify functionality. Use `npm run test:unit` for service layer tests and `npm run test:api` for API integration tests.*
*   **Database Schema/Migrations**:
    *   `npm run db:generate`: *Run this after any changes to `prisma/schema.prisma` to update the Prisma Client.*
    *   `npm run db:migrate`: *Use for creating and applying new migrations in development.*
    *   `npm run db:migrate:deploy`: *Use for applying migrations in a production context (e.g., during CI/CD verification).*

## 3. Architecture & Implementation Guidelines

### 3.1 Core Structure & Separation of Concerns

*   **Entry Point**: `src/index.ts`.
*   **Server Setup**: `src/server.ts`.
*   **API Routes (`src/api/v0/`)**: *These are thin HTTP layers. Their primary role is to handle HTTP requests/responses and delegate business logic to the service layer. Do NOT implement complex business logic directly in route handlers.*
*   **Service Layer (`src/services/`)**: *This is where all business logic resides. When implementing new features or modifying existing business rules, always operate within the appropriate service (e.g., `user.service.ts`). Services are injected via `src/services-plugin/index.ts`.*
*   **Database Interaction**: *Always use the `server.db` (PrismaClient) instance, accessed via dependency injection in services. Do not directly query the database outside of Prisma.*
*   **Error Handling**: *Utilize custom error classes from `src/errors/` (e.g., `UserNotFoundError`). Centralized error handling is managed by `src/plugins/error-handler.ts`. Ensure appropriate HTTP status codes are returned for errors.*
*   **Type Safety**: *Adhere strictly to TypeScript interfaces and DTOs defined in `src/types/` and schemas in `src/schemas/`. When defining new data structures or API contracts, create corresponding types/schemas.*

### 3.2 Key Patterns for AI Operations

*   **Import Strategy**: *Always use relative imports without file extensions. Example: `import { User } from './entity/user'`. Do not use module aliases.*
*   **Dependency Injection**: *Services are managed by `src/services/service-registry.ts` and injected via `src/services-plugin/index.ts`. When a service requires another dependency (e.g., `PrismaClient`), ensure it's properly injected.*
*   **Schema Validation**: *API validation schemas are defined in `src/schemas/`. When modifying API endpoints, ensure corresponding schemas are updated or created. Route handlers should use these schemas for request/response validation.*
*   **Testing Workflow**: *Tests run against compiled JavaScript in `build/`. When writing new tests:*
    *   *For service layer unit tests, mock dependencies (especially PrismaClient using `jest-mock-extended` from `src/test-utils/prisma-mock.ts`).*
    *   *For API integration tests, use real Fastify instances.*
    *   *Utilize shared test utilities and data factories from `src/test-utils/`.*
    *   *Ensure comprehensive coverage, including error scenarios.*

## 4. Directory Structure for Navigation

*   `src/api/v0/`: HTTP route handlers. *Look here to understand API endpoints.*
*   `src/services/`: Business logic layer. *This is the primary location for implementing or modifying core application logic.*
*   `src/schemas/`: API validation schemas. *Refer here for request/response data structures.*
*   `src/test-utils/`: Testing utilities and mocks. *Use these when writing or modifying tests.*
*   `src/types/`: TypeScript interfaces and DTOs. *Consult for data structure definitions.*
*   `src/errors/`: Custom error classes. *Use these for consistent error handling.*
*   `prisma/schema.prisma`: Database schema definition. *Crucial for understanding data models.*

## 5. Environment Configuration

*   The application uses environment variables. *When suggesting configuration changes or debugging, consider `NODE_ENV`, `PORT`, `DATABASE_URL`, and `TEST_DATABASE_URL`.*

## 6. General AI Operating Principles

*   **Verify All Changes**: *After any code modification, always run `npm run lint` and `npm test` to ensure code quality and functional correctness.*
*   **Adhere to Existing Patterns**: *When adding new code or refactoring, strictly follow the established architectural patterns (Service Layer, Dependency Injection, Schema Validation, Error Handling) and coding style of the existing codebase.*
*   **Prioritize Type Safety**: *Always strive for strong type safety. Introduce new types, interfaces, and DTOs as needed.*
*   **Concise Commits**: *When proposing commits, ensure messages are clear, concise, and follow conventional commit guidelines if present in `git log`.*