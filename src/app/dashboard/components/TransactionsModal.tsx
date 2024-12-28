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
  const { transactions } = useStore();

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const variantParents = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
        <h2 className="text-white text-2xl font-semibold mb-4">
          Transaction ID
        </h2>
        <div className="h-[450px] overflow-y-scroll flex flex-col gap-y-2 ">
          <Disclosure as="div" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between bg-slate-500 p-2 rounded-sm">
              <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                What is your refund policy?
              </span>

              <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                x2
              </span>
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-white/50 bg-slate-500 p-2 rounded-sm">
              If you're unhappy with your purchase, we'll refund you in full.
            </DisclosurePanel>
          </Disclosure>
          <Disclosure as="div" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between bg-slate-500 p-2 rounded-sm">
              <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                What is your refund policy?
              </span>

              <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                x2
              </span>
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-white/50 bg-slate-500 p-2 rounded-sm">
              If you're unhappy with your purchase, we'll refund you in full.
            </DisclosurePanel>
          </Disclosure>
        </div>

        <Button
          className="w-full mt-5"
          onClick={() => {
            onClose();
          }}
        />
      </motion.div>
    </motion.div>
  );
};
