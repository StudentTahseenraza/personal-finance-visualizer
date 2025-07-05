// src/app/api/budgets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const { category, amount, month } = await req.json();
  const client = await connectToDatabase();
  const db = client.db('finance');
  const collection = db.collection('budgets');
  const result = await collection.insertOne({
    category,
    amount: Number(amount),
    month,
    createdAt: new Date(),
  });
  return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, category, amount, month } = await req.json();
  const client = await connectToDatabase();
  const db = client.db('finance');
  const collection = db.collection('budgets');
  await collection.updateOne({ _id: id }, { $set: { category, amount: Number(amount), month, createdAt: new Date() } });
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const client = await connectToDatabase();
  const db = client.db('finance');
  const collection = db.collection('budgets');
  await collection.deleteOne({ _id: id });
  return NextResponse.json({ success: true }, { status: 200 });
}