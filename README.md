# Filemaker Next.js Integration

This project provides a Supabase-like data manipulation interface for Filemaker DATA API in Next.js applications.

## Overview

The Filemaker DATA API allows developers to interact with Filemaker databases programmatically. This project wraps the API in a more developer-friendly interface, similar to Supabase's client libraries.

## Features

- FilemakerClient: A TypeScript client for interacting with Filemaker DATA API
- Authentication: Uses environment variables for Filemaker credentials
- Type Safety: Fully typed API responses and requests
- Middleware: Next.js middleware for handling authentication

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
import { FileMakerAuth } from '@/lib/filemaker/FileMakerAuth';
import { FileMakerClient } from '@/lib/filemaker/FileMakerClient';

const auth = new FileMakerAuth({
  secret: process.env.NEXT_PUBLIC_FILEMAKER_SECRET,
});

const client = new FileMakerClient({
  auth,
});
```

### Data Operations

```typescript
// Create record
const newRecord = await client.from('your-layout').create({
  field1: 'value1',
  field2: 'value2',
});

// Read records
const records = await client.from('your-layout').select('*');

// Update record
const updatedRecord = await client.from('your-layout').update(recordId, {
  field1: 'new-value',
});

// Delete record
await client.from('your-layout').delete(recordId);
```

## Authentication

Authentication is handled through environment variables:

```bash
NEXT_PUBLIC_FILEMAKER_HOST_URL=your-filemaker-server.com
NEXT_PUBLIC_FILEMAKER_DATABASE_NAME=your-database
NEXT_PUBLIC_FILEMAKER_AUTH_ID=your-username
NEXT_PUBLIC_FILEMAKER_AUTH_PASS=your-password
NEXT_PUBLIC_FILEMAKER_SECRET=your-jwt-secret
```

## Dependencies

- Next.js 14
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
