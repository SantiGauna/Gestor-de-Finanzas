export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  type: 'income' | 'expense';
  accountId: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: 'ARS' | 'USD';
  type: 'savings' | 'checking' | 'investment';
}

export interface User {
  id: string;
  name: string;
  email: string;
  accounts: Account[];
}