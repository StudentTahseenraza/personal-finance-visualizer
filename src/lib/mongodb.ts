// src/lib/mongodb.ts
import { MongoClient, MongoClientOptions } from 'mongodb';

// Define a type augmentation for the global object
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const uri: string = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch((err) => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((err) => {
    console.error('MongoDB connection error:', err);
    throw err;
  });
}

export default async function connectToDatabase() {
  const client = await clientPromise;
  return client; // Return the MongoClient instance
}