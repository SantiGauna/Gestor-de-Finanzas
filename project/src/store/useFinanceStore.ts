import { create } from 'zustand';
import { Transaction, Account, User } from '../types/finance';

interface FinanceStore {
  user: User | null;
  transactions: Transaction[];
  accounts: Account[];
  addTransaction: (transaction: Transaction) => void;
  addAccount: (account: Account) => void;
  updateBalance: (accountId: string, amount: number) => void;
  initializeData: () => void;
}

export const useFinanceStore = create<FinanceStore>((set) => ({
  user: null,
  transactions: [],
  accounts: [],
  addTransaction: (transaction) =>
    set((state) => {
      const updatedAccounts = state.accounts.map(account => {
        if (account.id === transaction.accountId) {
          const amountChange = transaction.type === 'income' ? transaction.amount : -transaction.amount;
          return {
            ...account,
            balance: account.balance + amountChange
          };
        }
        return account;
      });

      return {
        transactions: [transaction, ...state.transactions],
        accounts: updatedAccounts
      };
    }),
  addAccount: (account) =>
    set((state) => ({
      accounts: [...state.accounts, account],
    })),
  updateBalance: (accountId, amount) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === accountId
          ? { ...account, balance: account.balance + amount }
          : account
      ),
    })),
  initializeData: () => {
    const exampleAccounts: Account[] = [
      {
        id: '1',
        name: 'Cuenta Corriente',
        balance: 150000,
        currency: 'ARS',
        type: 'checking'
      },
      {
        id: '2',
        name: 'Caja de Ahorro USD',
        balance: 1000,
        currency: 'USD',
        type: 'savings'
      },
      {
        id: '3',
        name: 'Inversiones',
        balance: 500000,
        currency: 'ARS',
        type: 'investment'
      }
    ];

    const exampleTransactions: Transaction[] = [
      {
        id: '1',
        amount: 75000,
        description: 'Sueldo',
        category: 'Ingresos',
        date: new Date('2024-02-01'),
        type: 'income',
        accountId: '1'
      },
      {
        id: '2',
        amount: 25000,
        description: 'Supermercado',
        category: 'Alimentación',
        date: new Date('2024-02-02'),
        type: 'expense',
        accountId: '1'
      },
      {
        id: '3',
        amount: 15000,
        description: 'Internet',
        category: 'Servicios',
        date: new Date('2024-02-03'),
        type: 'expense',
        accountId: '1'
      }
    ];

    set({ accounts: exampleAccounts, transactions: exampleTransactions });
  }
}));