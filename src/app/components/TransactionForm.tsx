// src/app/components/TransactionForm.tsx
'use client';
import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Others'];

interface Transaction {
  id?: string;
  amount: number;
  date: string; // Ensure date is ISO string
  description: string;
  category: string;
  createdAt?: string;
}

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
  transactionToEdit: Transaction | null;
  onUpdateTransaction: (transaction: Transaction) => void;
}

export default function TransactionForm({ onAddTransaction, transactionToEdit, onUpdateTransaction }: TransactionFormProps) {
  const [form, setForm] = useState({ amount: '', date: '', description: '', category: '' });
  const [errors, setErrors] = useState({ amount: '', date: '', description: '', category: '' });

  useEffect(() => {
    if (transactionToEdit) {
      setForm({
        amount: transactionToEdit.amount.toString(),
        date: new Date(transactionToEdit.date).toISOString().split('T')[0], // ISO date
        description: transactionToEdit.description,
        category: transactionToEdit.category,
      });
    } else {
      setForm({ amount: '', date: '', description: '', category: '' });
    }
  }, [transactionToEdit]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { amount: '', date: '', description: '', category: '' };
    if (!form.amount) { newErrors.amount = 'Amount is required'; isValid = false; }
    if (!form.date) { newErrors.date = 'Date is required'; isValid = false; }
    if (!form.description) { newErrors.description = 'Description is required'; isValid = false; }
    if (!form.category) { newErrors.category = 'Category is required'; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const transaction: Transaction = {
      amount: Number(form.amount),
      date: new Date(form.date).toISOString(), // Ensure ISO format
      description: form.description,
      category: form.category,
    };
    if (transactionToEdit) {
      onUpdateTransaction({ ...transaction, id: transactionToEdit.id });
      toast.success('Transaction updated!');
    } else {
      onAddTransaction(transaction);
      toast.success('Transaction added!');
    }
    setForm({ amount: '', date: '', description: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        {...{className:"p-6 glass-card"}}
      >
        <AnimatePresence>
          {transactionToEdit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...{className:"text-lg font-semibold text-[var(--primary)] mb-4"}}
            >
              Editing: {transactionToEdit.description}
            </motion.div>
          )}
        </AnimatePresence>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-900">Amount ($)</label>
          <Input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="form-input"
            placeholder="Enter amount"
          />
          {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-900">Date</label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="form-input"
          />
          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-900">Description</label>
          <Input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="form-input"
            placeholder="Enter description"
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-900">Category</label>
          <Select
            value={form.category}
            onValueChange={(value) => setForm({ ...form, category: value })}
          >
            <SelectTrigger className="form-input">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-500 dark:border-gray-300">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="hover:bg-gray-100 dark:hover:bg-gray-400">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
        </div>
        <Button type="submit" className="w-full btn-primary">
          {transactionToEdit ? 'Update Transaction' : 'Add Transaction'}
        </Button>
      </motion.div>
    </form>
  );
}