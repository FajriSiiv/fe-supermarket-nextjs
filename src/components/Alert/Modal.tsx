import React from "react";

interface ModalProps {
  message: string;
  onYes: () => void;
  onNo: () => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onYes, onNo, onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px]  flex justify-center items-center">
      <div className="bg-white p-5 rounded-md text-center border-2 border-rose-600">
        <p>{message}</p>
        <div className="text-white">
          <button
            className="m-3 py-1 px-5 cursor-pointer bg-emerald-600 rounded-sm"
            onClick={() => {
              onYes();
              onClose();
            }}
          >
            Ya
          </button>
          <button
            className="m-3 py-1 px-5 cursor-pointer bg-rose-600 rounded-sm"
            onClick={() => {
              onNo();
              onClose();
            }}
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
