# Fastify TypeScript Starter

A modern TypeScript starter template for building scalable APIs with Fastify, Prisma ORM, and service layer architecture, compiled to ES Modules.

## ✨ Features

- **🚀 Fastify** - Fast and low overhead web framework
- **📘 TypeScript** - Type safety and modern JavaScript features, compiled to ES Modules
- **🗄️ Prisma ORM** - Modern database toolkit with type-safe client generation
- **🐬 MySQL** - Reliable and performant database
- **🏗️ Service Layer** - Clean architecture with separation of concerns
- **🎯 Dependency Injection** - Service registry with automatic injection
- **🛡️ Error Handling** - Centralized error handling with custom error classes
- **📚 Swagger** - API documentation with OpenAPI 3.0
- **🔍 ESLint & Prettier** - Code formatting and linting
- **🧪 Jest** - Testing framework with TypeScript support
- **📦 ES Modules** - Modern module system for Node.js with native ESM support

## 🏗️ Architecture

This starter follows modern API architecture principles:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Routes    │───▶│   Service Layer │───▶│   Database      │
│  (HTTP Layer)   │    │ (Business Logic)│    │   (Prisma)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

- **API Routes**: Thin HTTP layer handling requests/responses
- **Service Layer**: Business logic, validation, and data operations
- **Error Handling**: Centralized error management with proper HTTP codes
- **Type Safety**: End-to-end TypeScript with DTOs and interfaces

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 24.0.0)
- MySQL (>= 8.x)
- npm

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/fastify-typescript-starter.git
cd fastify-typescript-starter
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment:**

Create a `.env` file or update the existing one with your database credentials:

```env
DATABASE_URL="mysql://root:password@localhost:3306/starter_db"
TEST_DATABASE_URL="mysql://root:password@localhost:3306/test_db"
```

4. **Set up the database:**

```bash
# Create databases
mysql -h 127.0.0.1 -u root --password=root -e "CREATE DATABASE starter_db;"
mysql -h 127.0.0.1 -u root --password=root -e "CREATE DATABASE test_db;"

# Generate Prisma client and run migrations
npm run db:generate
npm run db:migrate
```

5. **Start the server:**

```bash
# Build and start
npm run build
npm start

# Development mode (with auto-restart)
npm run build:watch  # Terminal 1
npm run dev          # Terminal 2
```

## 📖 API Documentation

Once the server is running, access the interactive Swagger documentation:

- **Local**: http://localhost:3000/documentation
- **API Base URL**: http://localhost:3000/api/v0

### Available Endpoints

| Method | Endpoint          | Description                     |
|--------|------------------|---------------------------------|
| GET    | `/api/v0/users`   | List users (with pagination)   |
| GET    | `/api/v0/users/:id` | Get user by ID                |
| POST   | `/api/v0/users`   | Create new user                 |
| PUT    | `/api/v0/users/:id` | Update user                   |
| DELETE | `/api/v0/users/:id` | Delete user                   |
| GET    | `/api/v0/ping`    | Health check                    |

## 🛠️ Available Scripts

### Development
- `npm run dev` - Start development server with nodemon
- `npm run build:watch` - Compile TypeScript in watch mode

### Build & Production
- `npm run build` - Compile TypeScript to ES Modules
- `npm start` - Start production server
- `npm run clean` - Remove build directory

### Database Operations
- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Create and apply new migration
- `npm run db:migrate:deploy` - Apply migrations (production)
- `npm run db:reset` - Reset database and apply all migrations
- `npm run db:studio` - Open Prisma Studio database browser

### Testing & Quality
- `npm test` - Run Jest tests
- `npm run ci:test` - Full CI pipeline (build, migrate, test)
- `npm run lint` - Run ESLint and Prettier

## 📁 Project Structure

```
src/
├── api/v0/                  # 🌐 HTTP route handlers (thin layer)
│   ├── index.ts             # Route aggregator
│   ├── users.ts             # User CRUD endpoints
│   └── ping.ts              # Health check
├── services/                # 🏗️ Business logic layer
│   ├── user.service.ts      # User operations & validation
│   └── service-registry.ts  # Service dependency injection
├── services-plugin/         # 🔌 Fastify service injection
├── types/                   # 📝 TypeScript interfaces & DTOs
│   ├── user.types.ts        # User-related types
│   └── common.types.ts      # Shared types
├── errors/                  # ⚠️ Custom error classes
│   ├── base.error.ts        # Base error with HTTP codes
│   └── user.errors.ts       # User-specific errors
├── plugins/                 # 🔧 Fastify plugins
│   └── error-handler.ts     # Centralized error handling
├── db-connection/           # 🗄️ Database connection setup
├── swagger/                 # 📚 API documentation
├── index.ts                 # 🚀 Application entry point
└── server.ts                # ⚙️ Fastify server configuration

prisma/
├── schema.prisma            # 📋 Database schema definition
└── migrations/              # 📈 Database migration files
```

## 🎯 Usage Examples

### Service Layer Usage

```typescript
// In routes - clean and simple
async (request, reply) => {
  const users = await server.services.userService.getAllUsers({
    page: 1,
    limit: 10,
    search: 'john'
  });
  return reply.send(users);
}

// Service handles business logic
export class UserService {
  async getAllUsers(options: UserQueryOptions): Promise<PaginatedResponse<UserDto>> {
    // Validation, filtering, pagination logic
    const { page = 1, limit = 10, search } = options;
    // Database operations
    // Error handling
    return { data: users, pagination: { ... } };
  }
}
```

### Error Handling

```typescript
// Custom errors with proper HTTP codes
throw new UserNotFoundError(`User with id ${id} not found`);  // 404
throw new UserAlreadyExistsError(`Email already in use`);     // 409

// Centralized error handler automatically formats responses
{
  "success": false,
  "error": "User with id 123 not found",
  "statusCode": 404,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "path": "/api/v0/users/123"
}
```

## 🔧 Environment Variables

| Variable              | Description                      | Default     |
|-----------------------|----------------------------------|-------------|
| `NODE_ENV`           | Environment mode                 | -           |
| `PORT`               | Server port                      | 3000        |
| `DATABASE_URL`       | Primary database connection      | (required)  |
| `TEST_DATABASE_URL`  | Test database connection         | (required)  |

## 🏛️ Architecture Principles

### Service Layer Benefits

- **🎯 Single Responsibility**: Each service handles one domain
- **🔄 Reusability**: Services can be used across multiple routes
- **🧪 Testability**: Easy to mock and unit test business logic
- **📈 Scalability**: Clean separation allows independent scaling
- **🛡️ Error Handling**: Consistent error management across the app

### Type Safety

The codebase enforces strict TypeScript patterns with **zero** `@typescript-eslint/no-explicit-any` warnings:

- **DTOs**: Data Transfer Objects for API contracts (`CreateUserDto`, `UpdateUserDto`)
- **Interfaces**: Clear contracts between layers
- **Prisma Types**: Auto-generated database types
- **Service Types**: Business logic type definitions
- **Mock Helpers**: Type-safe testing utilities (`asMockUser`, `asMockUserArray`)
- **Error Handling**: Proper `unknown` types instead of `any`

```typescript
// Type-safe API handlers
const userData = request.body as CreateUserDto;

// Type-safe mock testing
prismaMock.user.findMany.mockResolvedValue(asMockUserArray(users));

// Proper error type casting
const prismaError = error as unknown as { code: string; meta?: unknown };
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test users.spec.ts
```

## 🚀 Deployment

1. **Build the application:**
```bash
npm run build
```

2. **Set environment variables:**
```bash
export DATABASE_URL="mysql://user:pass@host:port/database"
export NODE_ENV="production"
```

3. **Run database migrations:**
```bash
npm run db:migrate:deploy
```

4. **Start the server:**
```bash
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the service layer pattern for new features
- Add proper TypeScript types and interfaces
- Include unit tests for business logic
- Update API documentation for new endpoints
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using modern Node.js best practices**