"use client";
import Modal from "@/components/Alert/Modal";
import Button from "@/components/Button/BasicButton";
import { useAlert } from "@/hooks/useAlert";
import { useStore } from "@/lib/zustand/useStore";
import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { TransactionsModal, useTransactionsModal } from "./TransactionsModal";

const SidebarTransactions = () => {
  const { transactions, removeTransaction, updateQuantity } = useStore();
  const [sentTransactions, setSentTransactions] = useState();

  const { success, isModalOpen, message, onYes, onNo, closeModal } = useAlert();

  const {
    openModal: openModalTransaction,
    closeModal: closeModalTransaction,
    isModalOpen: isModalOpenTrasaction,
    onNo: onNoClick,
    onYes: onYesClick,
  } = useTransactionsModal();

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
      openModalTransaction(() => {
        // setSentTransactions({ total: totalPrice, transactions });
        console.log("sent transactions");
      }, handleNo);
    }
  };

  return (
    <div className="rounded-md min-h-[90vh] flex flex-col justify-between">
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            message={message}
            onYes={onYes}
            onNo={onNo}
            onClose={closeModal}
          />
        )}
        {isModalOpenTrasaction && (
          <TransactionsModal onClose={closeModalTransaction} />
        )}
      </AnimatePresence>

      <div className="w-full bg-[#f3f3f3] flex flex-col p-2 gap-y-2 h-[80vh] overflow-y-scroll sidebar-scroll rounded-md">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="h-fit flex flex-col p-2 bg-slate-200 rounded-md"
          >
            <span className="font-semibold text-sm">
              {transaction.title.slice(0.4)}
            </span>
            <span className="font-semibold">Price : ${transaction.price}</span>
            <div className="flex items-center justify-between">
              <Button
                onClick={() =>
                  handleUpdateQuantity(
                    transaction.id,
                    transaction.quantity,
                    "decrease"
                  )
                }
                text="-"
              />
              <span className="col-span-2 text-center">
                {transaction.quantity}
              </span>
              <Button
                onClick={() =>
                  handleUpdateQuantity(
                    transaction.id,
                    transaction.quantity,
                    "increment"
                  )
                }
                text="+"
              />
            </div>
            <Button
              onClick={() => handleRemoveTransaction(transaction.id)}
              text="Delete"
              bgC="bg-rose-600 hover:bg-rose-600/80"
              className="mt-1"
              textColor="text-white"
            />
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
