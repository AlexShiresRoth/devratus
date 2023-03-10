import React from "react";

type Props = {
  children: React.ReactNode;
};
const ModalContainer = ({ children }: Props) => {
  return (
    <div className="fixed bg-black/70 h-screen w-screen z-50 flex top-0 left-0 justify-center items-center">
      <div className="min-w-[800px] bg-slate-900 border-[1px] border-sky-800/50 rounded">
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
