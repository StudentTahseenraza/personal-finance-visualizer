'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

   interface MonthlyChartProps {
    transactions: any[];
  }

      export default function MonthlyChart({ transactions }: MonthlyChartProps) {
        const monthlyData = transactions.reduce((acc, t) => {
          const date = new Date(t.date);
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
         acc[monthYear] = (acc[monthYear] || 0) + t.amount;
          return acc;
        }, {} as Record<string, number>);
        const data = Object.entries(monthlyData).map(([name, amount]) => ({ name, amount }));
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      }