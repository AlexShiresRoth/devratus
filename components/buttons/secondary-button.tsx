import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: (args?: any) => void;
  isDisabled?: boolean;
};

const SecondaryButton = ({ children, onClick, isDisabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className='p-2 text-xs rounded text-slate-50 bg-slate-600 font-semibold hover:bg-sky-800 transition-all  hover:shadow-none'
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
