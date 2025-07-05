// src/app/page.tsx
import ClientHome from '@/app/components/ClientHome';
import connectToDatabase from '@/lib/mongodb'; // Default import

export default async function Home() {
  const client = await connectToDatabase();
  const db = client.db('finance'); // Specify your database name
  const transactionsCollection = db.collection('transactions');
  const budgetsCollection = db.collection('budgets');
  const transactions = await transactionsCollection.find({}).toArray();
  const budgets = await budgetsCollection.find({}).toArray();

  // Convert MongoDB objects to plain JavaScript objects with proper date handling
  const plainTransactions = transactions.map((transaction) => ({
    id: transaction._id.toString(),
    amount: transaction.amount,
    date: transaction.date instanceof Date ? transaction.date.toISOString() : new Date(transaction.date).toISOString(), // Ensure valid Date
    description: transaction.description,
    category: transaction.category,
    createdAt: transaction.createdAt ? (transaction.createdAt instanceof Date ? transaction.createdAt.toISOString() : new Date(transaction.createdAt).toISOString()) : undefined,
  }));

  const plainBudgets = budgets.map((budget) => ({
    id: budget._id.toString(),
    category: budget.category,
    amount: budget.amount,
    month: budget.month,
    createdAt: budget.createdAt ? (budget.createdAt instanceof Date ? budget.createdAt.toISOString() : new Date(budget.createdAt).toISOString()) : undefined,
  }));

  return <ClientHome transactions={plainTransactions} budgets={plainBudgets} />;
}