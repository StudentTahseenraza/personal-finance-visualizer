// src/app/layout.tsx
'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <html lang="en" data-theme={theme}>
      <body className={inter.className}>
        <header className="sticky top-0 z-50 py-4 glass-card">
          <div className="container flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
              Finance Visualizer
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white hover:bg-white/20"
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </Button>
          </div>
        </header>
        <main className="min-h-screen pt-6">{children}</main>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'glass-card',
            style: {
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: theme === 'light' ? '#111827' : '#F9FAFB',
            },
          }}
        />
      </body>
    </html>
  );
}