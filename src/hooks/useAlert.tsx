import { useState } from "react";

export const useAlert = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onYes, setOnYes] = useState<() => void>(() => () => {});
  const [onNo, setOnNo] = useState<() => void>(() => () => {});

  const success = (message: string, onYes: () => void, onNo: () => void) => {
    setMessage(message);
    setOnYes(() => onYes);
    setOnNo(() => onNo);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return {
    success,
    isModalOpen,
    message,
    onYes,
    onNo,
    closeModal,
  };
};
