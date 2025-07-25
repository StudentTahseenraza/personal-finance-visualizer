# 💰 Personal Finance Visualizer

A modern web application to **track**, **manage**, and **visualize personal finances** with an intuitive UI, vibrant glassmorphism effects, and interactive charts.

---

## 🚀 Features

- 🔄 **Transaction Management** – Add, edit, and delete transactions with real-time validation.
- 📊 **Dashboard & Insights** – Get a visual breakdown of your expenses with bar and pie charts.
- 🧾 **Budget Planning** – Set and manage budgets by category and month.
- 💡 **Spending Insights** – View top spending categories and those over budget.
- 🌗 **Theme Toggle** – Switch between light and dark modes seamlessly.
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile views.
- 🧊 **Glassmorphism UI** – Modern translucent cards with vibrant gradients (teal, purple, yellow).
- ✨ **Animated Forms** – Smooth, dynamic transitions for adding/editing transactions and budgets.

---

## 🧰 Tech Stack

### 🔹 Frontend

- **Next.js 14.2.3** – React framework with SSR & static site generation
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Smooth animations
- **shadcn/ui** – Accessible & customizable UI components
- **Lucide React** – Icon library

### 🔸 Backend

- **MongoDB** – NoSQL database
- **MongoDB Node.js Driver** – Official MongoDB connection handler

### 🔔 Other

- **Sonner** – Toast notifications
- **Vercel** – Hosting & deployment

---

## ⚙️ Prerequisites

- Node.js (v18+)
- npm (v9+)
- MongoDB Atlas account (or local MongoDB instance)
- Git (for version control)

---

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/StudentTahseenraza/personal-finance-visualizer.git
   cd personal-finance-visualizer
   npm install
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
   npm run dev
