# Expense Tracker (React + Vite + Supabase)

This project is an **Expense Tracker web application** built with **React (Vite)** and powered by **Supabase** for authentication, database, and backend services.  
It is deployed under the subdomain: [https://et.paulndalila.top](https://et.paulndalila.top)

---

## Features

- 🔐 Authentication with **Supabase Auth** (Email/Password + Google OAuth)
- 🗄️ Data management with **Supabase Database** (transactions i.e. incomes, loans, spendings)
- 📊 Track and analyze personal expenses with summaries and insights
- 🌐 Hosted at [et.paulndalila.top](https://et.paulndalila.top)
- ⚡ Built with **React + Vite** for fast and modern frontend development
- 🎨 Styled with **TailwindCSS** and Material UI components

---

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Supabase (Auth + Database)
- **Styling:** TailwindCSS + Material UI
- **Deployment:** Vercel / Render

---

## Database Schema (Supabase)

We use **Supabase Postgres** for storing and managing data.

### `transactions` table

Stores expenses, income, loans, and debt repayments.

```sql
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  type text check (type in ('expense', 'income', 'loan', 'debt_repayment')) not null,
  item text,
  amount numeric not null check (amount > 0),
  description text,
  paid_in text check (paid_in in ('cash', 'mpesa', 'bank', 'card', 'other')),
  transaction_date date default current_date,
  created_at timestamp default now()
);

-- Useful indexes
create index if not exists idx_transactions_user on transactions(user_id);
create index if not exists idx_transactions_date on transactions(transaction_date);
```
