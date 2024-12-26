"use client";
import { useStore } from "@/lib/zustand/useStore";
import React, { useState } from "react";

const SidebarTransactions = () => {
  const { transactions, removeTransaction, updateQuantity } = useStore();
  const [sentTransactions, setSentTransactions] = useState();

  const handleRemoveTransaction = (id) => {
    removeTransaction(id);
  };

  const handleUpdateQuantity = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const totalPrice = transactions.reduce((total, transaction) => {
    return total + transaction.price * transaction.quantity;
  }, 0);

  const sentToAPI = () => {
    setSentTransactions({ total: totalPrice, transactions });

    console.log(sentTransactions);
  };

  return (
    <div className="rounded-md min-h-[90vh] flex flex-col justify-between">
      <div className="w-full bg-slate-200 flex flex-col p-2 gap-y-2 h-[80vh] overflow-y-scroll sidebar-scroll rounded-md">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="h-fit flex flex-col p-2 bg-slate-100 rounded-md"
          >
            <span className="font-semibold text-sm">
              {transaction.title.slice(0.4)}
            </span>
            <span className="font-semibold">Price : ${transaction.price}</span>
            <span className="font-semibold">
              Quantity :{transaction.quantity}
            </span>
            <button
              onClick={() => handleRemoveTransaction(transaction.id)}
              className="bg-rose-600 rounded-sm text-white my-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="h-[8vh] bg-slate-700 p-2 rounded-md flex justify-center items-center text-white">
        <button className="text-lg font-semibold" onClick={() => sentToAPI()}>
          Total : ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default SidebarTransactions;
