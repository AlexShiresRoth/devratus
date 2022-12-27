import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: (args?: any) => void;
};

const PrimaryButton = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-base  bg-sky-500 rounded text-slate-50 font-bold hover:bg-sky-800 transition-all"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
