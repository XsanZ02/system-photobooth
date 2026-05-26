# Backend Structure

## Directories

- **src/server.ts** - Main server entry point
- **src/controllers/** - Route handlers
- **src/middleware/** - Express middleware
- **src/routes/** - API routes
- **src/services/** - Business logic
- **src/socket/** - Socket.io handlers
- **src/prisma/** - Database schema and migrations

## Key Files

- **tsconfig.json** - TypeScript configuration
- **.env.local** - Environment variables (local dev)
- **package.json** - Dependencies and scripts

## Setup

1. Configure `.env.local` with your database and services
2. Run `npm run prisma:migrate` to setup database
3. Run `npm run dev` to start development server
