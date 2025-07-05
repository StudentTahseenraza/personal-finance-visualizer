// src/app/components/ClientHome.tsx
'use client';
import { useState } from 'react';
import TransactionForm from '@/app/components/TransactionForm';
import TransactionList from '@/app/components/TransactionList';
import Dashboard from '@/app/components/Dashboard';
import SpendingInsights from '@/app/components/SpendingInsights';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { DollarSign, Wallet, PieChart } from 'lucide-react';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Others'];

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  createdAt?: string;
}

interface Budget {
  id: string;
  category: string;
  amount: number;
  month: string;
  createdAt?: string;
}

interface ClientHomeProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function ClientHome({ transactions: initialTransactions, budgets: initialBudgets }: ClientHomeProps) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [budgetForm, setBudgetForm] = useState({ category: '', amount: '', month: '' });

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    // Convert fetched data to plain objects
    setTransactions(
      data.map((t: any) => ({
        id: t._id.toString(),
        amount: t.amount,
        date: t.date,
        description: t.description,
        category: t.category,
        createdAt: t.createdAt?.toISOString(),
      }))
    );
  };

  const fetchBudgets = async () => {
    const res = await fetch('/api/budgets');
    const data = await res.json();
    // Convert fetched data to plain objects
    setBudgets(
      data.map((b: any) => ({
        id: b._id.toString(),
        category: b.category,
        amount: b.amount,
        month: b.month,
        createdAt: b.createdAt?.toISOString(),
      }))
    );
  };

  const handleAddTransaction = async (transaction: any) => {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (res.ok) {
      toast.success('Transaction added');
      fetchTransactions();
    } else {
      toast.error('Failed to add transaction');
    }
  };

  const handleUpdateTransaction = async (transaction: any) => {
    const res = await fetch('/api/transactions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...transaction, id: transaction.id }), // Use id
    });
    if (res.ok) {
      toast.success('Transaction updated');
      fetchTransactions();
      setTransactionToEdit(null);
    } else {
      toast.error('Failed to update transaction');
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    const res = await fetch('/api/transactions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      toast.success('Transaction deleted');
      fetchTransactions();
    } else {
      toast.error('Failed to delete transaction');
    }
  };

  const handleAddBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetForm.category || !budgetForm.amount || !budgetForm.month) {
      toast.error('All fields are required');
      return;
    }
    const res = await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...budgetForm, amount: Number(budgetForm.amount) }),
    });
    if (res.ok) {
      toast.success('Budget added');
      fetchBudgets();
      setBudgetForm({ category: '', amount: '', month: '' });
    } else {
      toast.error('Failed to add budget');
    }
  };

  return (
    <main className="container py-8 space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...{className:"text-center"}}
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
          Personal Finance Visualizer
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-900">Track, manage, and visualize your finances with ease.</p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        {...{className:"glass-card"}}
      >
        <div className="flex items-center mb-4 space-x-2">
          <DollarSign className="h-6 w-6 text-[var(--primary)]" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-900">Add Transaction</h2>
        </div>
        <TransactionForm
          onAddTransaction={handleAddTransaction}
          transactionToEdit={transactionToEdit}
          onUpdateTransaction={handleUpdateTransaction}
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        {...{className:"glass-card"}}
      >
        <div className="flex items-center mb-4 space-x-2">
          <Wallet className="h-6 w-6 text-[var(--primary)]" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-900">Set Budget</h2>
        </div>
        <form onSubmit={handleAddBudget} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-900">Category</label>
            <Select
              value={budgetForm.category}
              onValueChange={(value) => setBudgetForm({ ...budgetForm, category: value })}
            >
              <SelectTrigger className="w-full form-input">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-900">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-900">Amount</label>
            <Input
              type="number"
              value={budgetForm.amount}
              onChange={(e) => setBudgetForm({ ...budgetForm, amount: e.target.value })}
              placeholder="Enter budget amount"
              className="w-full form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-900">Month</label>
            <Input
              type="month"
              value={budgetForm.month}
              onChange={(e) => setBudgetForm({ ...budgetForm, month: e.target.value })}
              className="w-full form-input"
            />
          </div>
          <Button type="submit" className="w-full btn-primary">
            Set Budget
          </Button>
        </form>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        {...{className:"card"}}
      >
        <div className="flex items-center mb-4 space-x-2">
          <PieChart className="h-6 w-6 text-[var(--primary)]" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-900">Dashboard</h2>
        </div>
        <Dashboard
          transactions={transactions}
          budgets={budgets}
          onEditTransaction={setTransactionToEdit}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        {...{className:"card"}}
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-900">Spending Insights</h2>
        <SpendingInsights transactions={transactions} budgets={budgets} />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        {...{className:"card"}}
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-900">All Transactions</h2>
        <TransactionList
          transactions={transactions}
          onEdit={setTransactionToEdit}
          onDelete={handleDeleteTransaction}
        />
      </motion.section>
    </main>
  );
}