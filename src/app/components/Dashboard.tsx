// src/app/components/Dashboard.tsx
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

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

interface DashboardProps {
  transactions: Transaction[];
  budgets: Budget[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export default function Dashboard({ transactions, budgets}: DashboardProps) {
  const chartData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  const barData = Object.entries(chartData).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black dark:text-gray-900">
                Total Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[var(--primary)]">
                ${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-900">
                Budget Utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[var(--secondary)]">
                {((transactions.reduce((sum, t) => sum + t.amount, 0) / budgets.reduce((sum, b) => sum + b.amount, 1)) * 100).toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-900">
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[var(--primary)]">{transactions.length}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...{className:"card"}}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-900">
            Monthly Spending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </motion.div>
    </div>
  );
}