import React from "react";

interface ButtonProps {
  text?: string;
  className?: string;
  paddingY?: string;
  paddingX?: string;
  onClick?: () => void;
  disabled?: boolean;
  bgC?: string;
  textColor?: string;
  type?: "submit" | "button" | "reset";
}

const Button = ({
  text,
  className,
  paddingY,
  paddingX,
  onClick,
  disabled = false,
  bgC,
  textColor,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      className={`${
        bgC ? bgC : "bg-[#ffffff]"
      } border-[1px] border-solid border-[#d1d5db] transition-all duration-100 rounded-lg ${
        textColor ? textColor : "text-slate-900"
      } text-sm font-semibold leading-5  text-center cursor-pointer touch-manipulation   focus:border-[#00000019] ${
        paddingY ? paddingY : "py-2"
      } ${paddingX ? paddingX : "px-3"} ${className} disabled:opacity-70`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text ? text : "Button"}
    </button>
  );
};

export default Button;
