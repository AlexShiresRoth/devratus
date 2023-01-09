import React from "react";

type Props = {
  children: React.ReactNode;
};

const ModalContentWrapper = ({ children }: Props) => {
  return <div className='p-4 flex flex-col '>{children}</div>;
};

export default ModalContentWrapper;
