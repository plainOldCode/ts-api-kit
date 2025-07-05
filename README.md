# Fastify TypeScript Starter

A modern TypeScript starter template for building APIs with Fastify and TypeORM, compiled to CommonJS.

## Features

- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Type safety and modern JavaScript features, compiled to CommonJS
- **TypeORM** - Data-mapper ORM for TypeScript and JavaScript
- **MySQL** - Reliable and performant database
- **Swagger** - API documentation with OpenAPI 3.0
- **ESLint & Prettier** - Code formatting and linting
- **Jest** - Testing framework with TypeScript support
- **CommonJS** - Standard Node.js module system for maximum compatibility

## Getting Started

### Prerequisites

- Node.js (>= 24.0.0)
- MySQL (>= 5.7)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/fastify-typescript-starter.git
cd fastify-typescript-starter
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
# Create database (adjust credentials as needed)
mysql -h 127.0.0.1 -u root --password=root -e "CREATE DATABASE starter_db;"

# Build the project first
npm run build

# Run migrations
npm run migrate:run
```

4. Start the server:

```bash
# Production mode
npm start

# Development mode (with auto-restart)
npm run dev  # Make sure to run npm run build:watch in another terminal
```

For active development:

```bash
# Terminal 1: Watch and compile TypeScript
npm run build:watch

# Terminal 2: Run with nodemon (restarts on file changes)
npm run dev
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:

- Local: http://localhost:3000/documentation

## Available Scripts

- `npm run build` - Compile TypeScript to CommonJS in `build/` directory
- `npm run build:watch` - Compile TypeScript in watch mode for development
- `npm run dev` - Start development server with nodemon (requires build first)
- `npm start` - Start production server from compiled code
- `npm run lint` - Run ESLint on all files
- `npm run clean` - Remove build directory
- `npm test` - Run Jest tests on TypeScript source files
- `npm run ci:test` - Full CI test pipeline (build, migrate test DB, run tests)
- `npm run migrate:run` - Run TypeORM migrations for local environment
- `npm run migrate:run-test` - Run TypeORM migrations for test environment
- `npm run migrate:init-test` - Initialize test database

## Environment Variables

| Variable      | Description                           | Default    |
| ------------- | ------------------------------------- | ---------- |
| `NODE_ENV`    | Environment (local, test, production) | -          |
| `PORT`        | Server port                           | 3000       |
| `DB_HOST`     | Database host                         | 127.0.0.1  |
| `DB_PORT`     | Database port                         | 3306       |
| `DB_USERNAME` | Database username                     | root       |
| `DB_PASSWORD` | Database password                     | password   |
| `DB_NAME`     | Database name                         | starter_db |

## Project Architecture

### Module System

This project uses **CommonJS** as the target module system:

- TypeScript source files use standard ES6 import/export syntax
- All imports use relative paths without file extensions (e.g., `import { User } from './entity/user'`)
- TypeScript compiles to CommonJS with `require()` and `module.exports`
- No module aliases or path mapping - all imports are explicit relative paths

### Project Structure

```
src/
├── api/
│   └── v0/                 # API routes (versioned)
│       ├── index.ts        # Route aggregator
│       ├── ping.ts         # Health check endpoint
│       ├── ping.spec.ts    # Test file
│       └── users.ts        # User CRUD endpoints
├── data-source/
│   └── index.ts           # TypeORM data source configuration
├── db-connection/
│   └── index.ts           # Database connection plugin
├── entity/
│   ├── base.ts            # Base entity with common fields
│   └── user.ts            # User entity
├── migration/
│   └── 1640000000000-init.ts  # Initial database migration
├── swagger/
│   └── index.ts           # Swagger/OpenAPI documentation
├── index.ts               # Application entry point
└── server.ts              # Fastify server configuration
```

### Build Output

The `build/` directory contains the compiled CommonJS JavaScript files that are executed in production.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
