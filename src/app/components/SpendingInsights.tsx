// src/app/components/SpendingInsights.tsx
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface SpendingInsightsProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function SpendingInsights({ transactions, budgets }: SpendingInsightsProps) {
  // Calculate category-wise spending
  const categoryData = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  // Find top spending category
  const topCategory = Object.entries(categoryData)
    .sort((a, b) => b[1] - a[1])[0] as [string, number] | undefined;

  // Find categories over budget
  const overBudget = budgets.filter((b) => (categoryData[b.category] || 0) > b.amount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...{className: "card"}}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-900">
            Spending Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topCategory && (
            <p className="text-[var(--primary)]">
              Top Category: {topCategory[0]} (${topCategory[1].toFixed(2)})
            </p>
          )}
          {overBudget.length > 0 ? (
            <p className="text-red-500">
              Over Budget: {overBudget.map((b) => b.category).join(', ')}
            </p>
          ) : (
            <p className="text-green-500">All categories within budget!</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}