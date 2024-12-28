import React from "react";

interface ButtonProps {
  text: string;
  className: string;
  paddingY: string;
  paddingX: string;
  onClick?: () => void;
  disable?: boolean;
}

const Button = ({
  text,
  className,
  paddingY,
  paddingX,
  onClick,
  disable = false,
}: ButtonProps) => {
  return (
    <button
      className={`bg-white border-[1px] border-solid border-[#d1d5db] rounded-lg text-slate-900 text-sm font-bold leading-5  text-center cursor-pointer touch-manipulation hover:bg-[#f9fafb] focus:border-[#00000019] ${
        paddingY ? paddingY : "py-2"
      } ${paddingX ? paddingX : "px-3"} ${className}`}
      onClick={onClick}
      disabled={disable}
    >
      {text ? text : "Button"}
    </button>
  );
};

export default Button;
