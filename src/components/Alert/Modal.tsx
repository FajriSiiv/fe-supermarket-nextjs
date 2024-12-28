import React from "react";
import { motion } from "motion/react";
import Button from "../Button/BasicButton";

interface ModalProps {
  message: string;
  onYes: () => void;
  onNo: () => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onYes, onNo, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.1 }}
      className="fixed top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-fit flex justify-center items-center z-50"
    >
      <div className="bg-white p-5 rounded-md text-center border-2 border-rose-600">
        <p>{message}</p>
        <div className="text-white flex gap-10 justify-center mt-4">
          <Button
            text="Ya"
            onClick={() => {
              onYes();
              onClose();
            }}
            bgC="bg-emerald-600"
            className="w-20 rounded-md"
            textColor="text-white"
          />

          <Button
            text="Tidak"
            onClick={() => {
              onNo();
              onClose();
            }}
            bgC="bg-rose-600"
            className="w-20 rounded-md"
            textColor="text-white"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
