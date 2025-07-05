import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('finance');
    const transactions = database.collection('transactions');
    const data = await transactions.find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.amount || !body.date || !body.description || !body.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await client.connect();
    const database = client.db('finance');
    const transactions = database.collection('transactions');
    const result = await transactions.insertOne({ ...body, createdAt: new Date() });
    return NextResponse.json({ id: result.insertedId });
  } catch (error) {
    console.error('Error adding transaction:', error);
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body._id) {
      return NextResponse.json({ error: 'Missing transaction ID' }, { status: 400 });
    }
    await client.connect();
    const database = client.db('finance');
    const transactions = database.collection('transactions');
    const { _id, ...updateData } = body;
    const result = await transactions.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    return NextResponse.json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing transaction ID' }, { status: 400 });
    }
    await client.connect();
    const database = client.db('finance');
    const transactions = database.collection('transactions');
    const result = await transactions.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  } finally {
    await client.close();
  }
}