# Fastify TypeScript Starter

A modern TypeScript starter template for building APIs with Fastify and TypeORM.

## Features

- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Type safety and modern JavaScript features
- **TypeORM** - Data-mapper ORM for TypeScript and JavaScript
- **MySQL** - Reliable and performant database
- **Swagger** - API documentation with OpenAPI 3.0
- **ESLint & Prettier** - Code formatting and linting
- **Jest** - Testing framework
- **Docker** - Containerization support

## Getting Started

### Prerequisites

- Node.js (>= 24.x)
- MySQL (>= 5.7)
- npm or yarn

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

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your database configuration
```

4. Set up the database:

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE starter_db;"

# Run migrations
npm run migrate:run
```

5. Build and start the server:

```bash
npm run build
npm start
```

For development:

```bash
npm run build:watch
# In another terminal
npm run dev
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:

- Local: http://localhost:3000/documentation

## Available Scripts

- `npm run build` - Build the TypeScript code
- `npm run build:watch` - Build in watch mode
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run migrate:run` - Run database migrations

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

## Project Structure

```
src/
├── api/
│   └── v0/
│       ├── index.ts
│       ├── ping.ts
│       └── users.ts
├── data-source/
│   └── index.ts
├── db-connection/
│   └── index.ts
├── entity/
│   ├── base.ts
│   └── user.ts
├── migration/
│   └── 1640000000000-init.ts
├── swagger/
│   └── index.ts
├── index.ts
└── server.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
