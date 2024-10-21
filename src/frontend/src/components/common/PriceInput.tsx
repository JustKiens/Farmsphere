import { useState, ChangeEvent, MouseEvent } from 'react'
import PhilippinePesoIcon from '../../icons/linear/PhilippinePesoIcon';

interface IPriceInput {
  className?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  didError?: Boolean;
  maxLength?: number;
  variant?: "green" | "red"
}

const PriceInput = (
  { className, 
    value, 
    placeholder, 
    onChange, 
    onBlur, 
    onClick,
    isDisabled, 
    didError, 
    maxLength, 
    variant = 'green'
  }: IPriceInput
) => {

  const [isFocused, setIsFocused] = useState(false);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value && !/^\d*$/.test(e.currentTarget.value)) {
      e.currentTarget.value = value as string;
    } 
  };

  const variantStyles = {
    green: "ring-green-500 outline outline-green-100",
    red: "ring-rose-500 outline outline-rose-100",
  };

  return (
    <div className={className +  ` 
      ${didError ? " ring-1 ring-rose-500 outline outline-offset-1 outline-3 outline-rose-100": 
      (isDisabled ? "ring-1 ring-gray-200 cursor-not-allowed text-sm":" ring-1 ring-gray-200")} flex px-2 h-10 items-center justify-center rounded-md ` + 
      (isFocused && !didError ?  `ring-1  outline-offset-1 outline-3 ${variantStyles[variant]}` : '')}
    >
      <div className="flex-shrink-0">
        <PhilippinePesoIcon className={`w-4 h-4 stroke-2 ${didError ? " stroke-rose-500 " : " stroke-gray-500 "}`} />
      </div>
      <input 
        value={value}
        className={` ${didError ? "placeholder:text-rose-500 text-sm text-rose-500" :(isDisabled ? "placeholder:text-gray-400 cursor-not-allowed text-gray-400 bg-white": "placeholder:text-gray-500 font-normal text-gray-700 text-sm placeholder:font-normal placeholder:text-sm")} outline-none h-full w-full rounded-md px-2 flex-1  `}
        placeholder={placeholder} 
        onChange={onChange} 
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) onBlur(e);
        }}
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
        onFocus={() => setIsFocused(true)}
        disabled={isDisabled} 
        maxLength={maxLength}
        onKeyDown={(e) => {
          if (!e.ctrlKey && !e.metaKey && !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onInput={handleInput}
      />
    </div>
  )
}

export default PriceInput