import React from "react";

type Props = {
  callback: (args: any) => void;
  children: React.ReactNode;
};

const DeleteButton = ({ callback, children }: Props) => {
  return (
    <button
      onClick={callback}
      className="px-4 py-2 text-slate-50 bg-red-500 flex items-center justify-center rounded transition-all hover:bg-red-600"
    >
      {children}
    </button>
  );
};

export default DeleteButton;
