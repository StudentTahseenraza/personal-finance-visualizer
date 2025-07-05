import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('finance');
    const budgets = database.collection('budgets');
    const data = await budgets.find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.category || !body.amount || !body.month) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await client.connect();
    const database = client.db('finance');
    const budgets = database.collection('budgets');
    const result = await budgets.insertOne({ ...body, createdAt: new Date() });
    return NextResponse.json({ id: result.insertedId });
  } catch (error) {
    console.error('Error adding budget:', error);
    return NextResponse.json({ error: 'Failed to add budget' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body._id) {
      return NextResponse.json({ error: 'Missing budget ID' }, { status: 400 });
    }
    await client.connect();
    const database = client.db('finance');
    const budgets = database.collection('budgets');
    const { _id, ...updateData } = body;
    const result = await budgets.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    return NextResponse.json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Error updating budget:', error);
    return NextResponse.json({ error: 'Failed to update budget' }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing budget ID' }, { status: 400 });
    }
    await client.connect();
    const database = client.db('finance');
    const budgets = database.collection('budgets');
    const result = await budgets.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error deleting budget:', error);
    return NextResponse.json({ error: 'Failed to delete budget' }, { status: 500 });
  } finally {
    await client.close();
  }
}

