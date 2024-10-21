import { ReactNode, MouseEvent, KeyboardEvent } from "react";

interface IButton {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  variant?: "primary" | "secondary" | "link" | "disabled" | "danger" | "delete";
}

const Button = ({ className = "", onClick, onKeyDown, type = "button", disabled, children, variant = "primary" }: IButton) => {
  const baseStyles = "text-base h-10 transition-all duration-300 ease-in-out outline-offset-4 flex items-center justify-start gap-1 text-center rounded-md px-4 py-2 flex items-center justify-center";
  const variantStyles = {
    primary: " bg-green-500 shadow-lg text-white hover:bg-green-400 active:bg-green-600 shadow-green-200 hover:shadow-xl hover:shadow-green-200 ",
    secondary: " hover:bg-gray-50 bg-white ring-1 text-gray-700 ring-gray-200 ",
    danger: "hover:bg-rose-50 ring-1 ring-rose-500 text-rose-500  ",
    delete: "hover:bg-red-400 ring-1 ring-red-500 text-white bg-red-500",
    link: " bg-white text-green-500 ",
    disabled: " bg-gray-500 text-gray-500 text-white  cursor-not-allowed",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      type={type}
      onKeyDown={onKeyDown}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;