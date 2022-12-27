import React from "react";
type Props = {
  children: React.ReactNode;
};

const Heading4 = ({ children }: Props) => {
  return (
    <h4 className="font-bold text-2xl text-slate-200 capitalize">{children}</h4>
  );
};

export default Heading4;
