// src/app/components/TransactionList.tsx
'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  createdAt?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="gradient-bg">
            <th className="p-4 font-semibold">Date</th>
            <th className="p-4 font-semibold">Description</th>
            <th className="p-4 font-semibold">Category</th>
            <th className="p-4 font-semibold">Amount</th>
            <th className="p-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <motion.tr
              key={transaction.id} // Use id instead of _id
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              {...{className:"border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-100"}}
            >
              <td className="p-4">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="p-4">{transaction.description}</td>
              <td className="p-4">{transaction.category}</td>
              <td className="p-4">${transaction.amount.toFixed(2)}</td>
              <td className="flex p-4 space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(transaction)}
                  className="hover:bg-[var(--primary)] hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(transaction.id)}
                  className="hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}