"use client";
import Button from "@/components/Button/BasicButton";
import { useStore } from "@/lib/zustand/useStore";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import React, { useState } from "react";
import { motion } from "motion/react";

export const useTransactionsModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [onYes, setOnYes] = useState<() => void>(() => () => {});
  const [onNo, setOnNo] = useState<() => void>(() => () => {});

  const openModal = (onYes: () => void, onNo: () => void) => {
    setOnYes(() => onYes);
    setOnNo(() => onNo);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return {
    openModal,
    isModalOpen,
    onYes,
    onNo,
    closeModal,
  };
};

export const TransactionsModal = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { transactions } = useStore();

  const total = transactions
    .reduce((total, transaction) => {
      return total + transaction.price * transaction.quantity;
    }, 0)
    .toFixed(2);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const variantParents = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleAPITransaction = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=10"
      ).then((res) => res.json());

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.href = "/";
      onClose();
    }
  };

  return (
    <motion.div
      variants={variantParents}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
      className="fixed w-screen h-screen z-10 bg-black/40 left-0 top-0"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.1 }}
        className=" w-[400px] absolute top-10 left-[35%] -translate-x-1/2  bg-slate-700 p-5 rounded-md"
      >
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="text-white text-2xl font-semibold">Transaction</h2>
          <Button
            className="w-fit border-none"
            onClick={() => {
              onClose();
            }}
            text="X"
            bgC="bg-white hover:bg-rose-500"
            textColor="hover:text-white"
          />
        </div>
        <div className="h-[450px] overflow-y-scroll flex flex-col gap-y-2 ">
          {transactions.map((transaction, index) => (
            <Disclosure as="div" defaultOpen={false} key={index}>
              <DisclosureButton className="group flex w-full items-center justify-between bg-slate-500 p-2 rounded-sm gap-6">
                <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                  {transaction.title}
                </span>

                <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                  x{transaction.quantity}
                </span>
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm/5 text-white/90 bg-slate-500 p-2 rounded-sm flex flex-col">
                <p>Name : {transaction.title}</p>
                <p>Quantity : {transaction.quantity}</p>
                <p>Price : ${transaction.price}</p>
              </DisclosurePanel>
            </Disclosure>
          ))}
        </div>

        <Button
          className="w-full mt-5"
          onClick={handleAPITransaction}
          text={loading ? "Loading..." : `Bayar $${total}`}
          disabled={loading}
        />
      </motion.div>
    </motion.div>
  );
};
