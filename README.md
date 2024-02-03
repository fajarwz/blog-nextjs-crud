# Simple Full-Stack CRUD with Next.js 14, PostgreSQL, and Prisma
This is an implementation of CRUD with Next.js 14. A blog about this can be found here: [Simple Full-Stack CRUD with Next.js 14, PostgreSQL, and Prisma | Fajarwz](https://fajarwz.com/blog/simple-full-stack-crud-with-nextjs-14-postgresql-and-prisma/).

## Configuration

### Create .env file from .env.example

```
cp .env.example .env
```

### Database Integration
1. Open .env file
2. Create a database and connect it with Next.js by adjusting the `DATABASE_URL` with your own configuration

### Migrate the Database Migration

```
npx prisma db push
```

## Installation

### Node Packages 
```
npm install
```

## Run App
```
npm run dev
```