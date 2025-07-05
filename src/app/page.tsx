// src/app/page.tsx
import ClientHome from '@/app/components/ClientHome';
import connectToDatabase from '@/lib/mongodb'; // Default import

export default async function Home() {
  const client = await connectToDatabase();
  const db = client.db('finance'); // Specify the database name (e.g., 'finance')
  const transactionsCollection = db.collection('transactions');
  const budgetsCollection = db.collection('budgets');
  const transactions = await transactionsCollection.find({}).toArray();
  const budgets = await budgetsCollection.find({}).toArray();

  // Convert MongoDB objects to plain JavaScript objects
  const plainTransactions = transactions.map((transaction) => ({
    id: transaction._id.toString(),
    amount: transaction.amount,
    date: transaction.date,
    description: transaction.description,
    category: transaction.category,
    createdAt: transaction.createdAt?.toISOString(),
  }));

  const plainBudgets = budgets.map((budget) => ({
    id: budget._id.toString(),
    category: budget.category,
    amount: budget.amount,
    month: budget.month,
    createdAt: budget.createdAt?.toISOString(),
  }));

  return <ClientHome transactions={plainTransactions} budgets={plainBudgets} />;
}