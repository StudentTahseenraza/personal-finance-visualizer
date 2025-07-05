'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

       interface CategoryPieChartProps {
         transactions: any[];
       }

       const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

       export default function CategoryPieChart({ transactions }: CategoryPieChartProps) {
         const categoryData = transactions.reduce((acc, t) => {
           acc[t.category] = (acc[t.category] || 0) + t.amount;
           return acc;
         }, {} as Record<string, number>);

         const data = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

         return (
           <ResponsiveContainer width="100%" height={400}>
             <PieChart>
               <Pie
                 data={data}
                 dataKey="value"
                 nameKey="name"
                 cx="50%"
                 cy="50%"
                 outerRadius={150}
                 fill="#8884d8"
                 label
               >
                 {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
               <Tooltip />
             </PieChart>
           </ResponsiveContainer>
         );
       }