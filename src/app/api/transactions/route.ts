// src/app/api/transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const { amount, date, description, category } = await req.json();
  const client = await connectToDatabase();
  const db = client.db('finance');
  const collection = db.collection('transactions');
  const result = await collection.insertOne({
    amount,
    date: new Date(date), // Convert to Date for storage
    description,
    category,
    createdAt: new Date(),
  });
  return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, amount, date, description, category } = await req.json();
  const client = await connectToDatabase();
  const db = client.db('finance');
  const collection = db.collection('transactions');
  await collection.updateOne({ _id: id }, { $set: { amount, date: new Date(date), description, category, createdAt: new Date() } });
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const client = await connectToDatabase();
  const db = client.db('finance');
  const collection = db.collection('transactions');
  await collection.deleteOne({ _id: id });
  return NextResponse.json({ success: true }, { status: 200 });
}