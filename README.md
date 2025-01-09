# filemaker-nextjs

This project is a tool to make using the FileMaker Data API easier with Next.js, providing Supabase-like data operations.

## Overview

The Filemaker DATA API allows developers to interact with Filemaker databases programmatically. This project wraps the API in a more developer-friendly interface, similar to Supabase's client libraries.

## Features

- FileMakerClient: A TypeScript client for interacting with FileMaker DATA API
- Authentication: Uses a dedicated `FileMakerAuth` class for handling authentication.
- Type Safety: Fully typed API responses and requests
- Middleware: Next.js middleware for handling authentication (実装予定)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

## Usage

### Initialize the Client

```typescript
import { createFileMakerClient } from '@/lib/filemaker/FileMakerClient';
import { FileMakerAuth } from '@/lib/filemaker/FileMakerAuth';

const auth = new FileMakerAuth({
  username: process.env.NEXT_PUBLIC_FILEMAKER_USERNAME!, // FileMakerのユーザー名
  password: process.env.NEXT_PUBLIC_FILEMAKER_PASSWORD!, // FileMakerのパスワード
  jwtSecret: process.env.JWT_SECRET!, // JWTトークンの署名に使用する秘密鍵
});

const client = createFileMakerClient({ auth });
```

### Data Operations

```typescript
// Get records from the default database
const records = await client.get('your-layout');

// Get a single record from the default database
const singleRecord = await client.get('your-layout').single('recordId');

// Find records with conditions in the default database
const foundRecords = await client.find('your-layout').eq({ field1: 'value1' });

// Create a new record in the default database
const newRecord = await client.post('your-layout', {
  field1: 'value1',
  field2: 'value2',
});

// Update a record in the default database
const updatedRecord = await client.update('your-layout', 'recordId', {
  field1: 'new-value',
});

// Delete a record from the default database
await client.delete('your-layout', 'recordId');

// Get records from a specific database
const recordsFromDb = await client.db('another-database').get('another-layout');

// Update a record in a specific database
const updatedRecordInDb = await client
  .db('another-database')
  .update('another-layout', 'recordId', {
    field1: 'new-value',
  });
```

**Note:** When the database name is configured in the environment variables (`NEXT_PUBLIC_FILEMAKER_DATABASE_NAME`), `client.get()`, `client.find()`, and `client.post()` methods will use this default database. To access a different database, you can use `client.db('your-database-name')` to specify the target database.

## Authentication

Authentication is handled using the `FileMakerAuth` class and environment variables:

```bash
NEXT_PUBLIC_FILEMAKER_HOST_URL=your-filemaker-server.com/fmi/data/vLatest
NEXT_PUBLIC_FILEMAKER_DATABASE_NAME=your-database
NEXT_PUBLIC_FILEMAKER_USERNAME=your-username
NEXT_PUBLIC_FILEMAKER_PASSWORD=your-password
JWT_SECRET=your-jwt-secret
```

## Dependencies

- Next.js
- TypeScript 5
- Filemaker DATA API

## Learn More

To learn more about Filemaker DATA API, visit the [official documentation](https://help.claris.com/en/data-api-guide/).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
