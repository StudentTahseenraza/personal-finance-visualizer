'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

       interface BudgetComparisonChartProps {
         transactions: any[];
         budgets: any[];
       }

       export default function BudgetComparisonChart({ transactions, budgets }: BudgetComparisonChartProps) {
         const categoryData = transactions.reduce((acc, t) => {
           acc[t.category] = (acc[t.category] || 0) + t.amount;
           return acc;
         }, {} as Record<string, number>);

         const data = budgets.map((budget) => ({
           name: budget.category,
           budget: budget.amount,
           actual: categoryData[budget.category] || 0,
         }));

         return (
           <ResponsiveContainer width="100%" height={400}>
             <BarChart data={data}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Legend />
               <Bar dataKey="budget" fill="#8884d8" />
               <Bar dataKey="actual" fill="#82ca9d" />
             </BarChart>
           </ResponsiveContainer>
         );
       }