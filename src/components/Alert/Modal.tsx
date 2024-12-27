import React from "react";

interface ModalProps {
  message: string;
  onYes: () => void;
  onNo: () => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onYes, onNo, onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 w-[300px] h-[200px] bg-slate-500 flex justify-center items-center">
      <div className="bg-white p-5 rounded-md text-center">
        <p>{message}</p>
        <div className="">
          <button
            className="m-3 py-3 px-5 cursor-pointer"
            onClick={() => {
              onYes();
              onClose();
            }}
          >
            Yes
          </button>
          <button
            className="m-3 py-3 px-5 cursor-pointer"
            onClick={() => {
              onNo();
              onClose();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
