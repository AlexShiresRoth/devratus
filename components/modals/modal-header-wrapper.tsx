import React from "react";

type Props = {
  children: React.ReactNode;
};

const ModalHeaderWrapper = ({ children }: Props) => {
  return (
    <div className='flex items center justify-between border-b-[1px] border-sky-900 pb-2 p-4'>
      {children}
    </div>
  );
};

export default ModalHeaderWrapper;
