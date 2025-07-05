// src/app/components/TransactionList.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';

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
    <AnimatePresence>
      <motion.table {...{className: "w-full text-left border-collapse"}}>
        <thead>
          <tr className="gradient-bg">
            <th className="p-2 border-b">Date</th>
            <th className="p-2 border-b">Description</th>
            <th className="p-2 border-b">Category</th>
            <th className="p-2 border-b">Amount ($)</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <motion.tr
              key={transaction.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...{className:"border-b hover:bg-gray-50 dark:hover:bg-gray-200"}}
            >
              <td className="p-2">
                {new Date(transaction.date).toISOString().split('T')[0]} {/* Consistent ISO date */}
              </td>
              <td className="p-2">{transaction.description}</td>
              <td className="p-2">{transaction.category}</td>
              <td className="p-2">${transaction.amount.toFixed(2)}</td>
              <td className="flex p-2 space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(transaction)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(transaction.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </AnimatePresence>
  );
}


