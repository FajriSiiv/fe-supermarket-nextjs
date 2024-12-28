"use client";
import Modal from "@/components/Alert/Modal";
import { useAlert } from "@/hooks/useAlert";
import { useStore } from "@/lib/zustand/useStore";
import React, { useState } from "react";

const SidebarTransactions = () => {
  const { transactions, removeTransaction, updateQuantity } = useStore();
  const [sentTransactions, setSentTransactions] = useState();

  const { success, isModalOpen, message, onYes, onNo, closeModal } = useAlert();

  // Aksi untuk No
  const handleNo = () => {
    console.log("Tidak berhasil");
  };

  const handleRemoveTransaction = (id) => {
    success(
      `Hapus produk ini dari daftar belanja?`,
      () => removeTransaction(id),
      handleNo
    );
  };

  const handleUpdateQuantity = (id, quantity, condition) => {
    if (condition === "increment") {
      updateQuantity(id, quantity + 1);
    } else if (condition === "decrease" && quantity <= 1) {
      success(
        `Hapus produk ini dari daftar belanja?`,
        () => removeTransaction(id),
        handleNo
      );
    } else if (condition === "decrease") {
      updateQuantity(id, quantity - 1);
    }
  };

  const totalPrice = transactions.reduce((total, transaction) => {
    return total + transaction.price * transaction.quantity;
  }, 0);

  const sentToAPI = () => {
    if (transactions.length <= 0) {
      console.log("Belanja 0");
    } else {
      success(
        "Buat pesanan?",
        () => {
          setSentTransactions({ total: totalPrice, transactions });
        },
        handleNo
      );
    }
  };

  return (
    <div className="rounded-md min-h-[90vh] flex flex-col justify-between">
      {isModalOpen && (
        <Modal
          message={message}
          onYes={onYes}
          onNo={onNo}
          onClose={closeModal}
        />
      )}

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
            <div className="flex items-center justify-between">
              <button
                className="font-semibold  bg-rose-500 text-white col-span-1 w-12 rounded-sm"
                onClick={() =>
                  handleUpdateQuantity(
                    transaction.id,
                    transaction.quantity,
                    "decrease"
                  )
                }
              >
                -
              </button>
              <span className="col-span-2 text-center">
                {transaction.quantity}
              </span>
              <button
                onClick={() =>
                  handleUpdateQuantity(
                    transaction.id,
                    transaction.quantity,
                    "increment"
                  )
                }
                className="font-semibold  bg-rose-500 text-white col-span-1 w-12 rounded-sm"
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleRemoveTransaction(transaction.id)}
              className="bg-rose-500 rounded-sm text-white my-1 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="h-[8vh] bg-slate-700 p-2 rounded-md flex justify-center items-center text-white">
        <button
          className="w-full h-full text-lg font-semibold"
          onClick={() => sentToAPI()}
          disabled={transactions.length <= 0}
        >
          Total : ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default SidebarTransactions;
