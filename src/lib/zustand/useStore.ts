import { create } from "zustand";

export const useStore = create((set) => ({
  transactions: [],

  addTransaction: (transaction: any) =>
    set((state: any) => ({
      transactions: [...state.transactions, transaction],
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      transactions: state.transaction.map((transaction) =>
        transaction.id === id ? { ...transaction, quantity } : transaction
      ),
    })),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id
      ),
    })),

  updateTransaction: (id, updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      ),
    })),
}));
