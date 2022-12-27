import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: (args?: any) => void;
};

const SecondaryButton = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-xs border-[1px] rounded text-slate-50 font-semibold hover:bg-sky-800 transition-all"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
