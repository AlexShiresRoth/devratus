import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageContainer = ({ children }: Props) => {
  return (
    <section className="w-3/4 flex flex-col items-center bg-black min-h-screen py-10">
      <div className="w-3/4 flex flex-col">{children}</div>
    </section>
  );
};

export default PageContainer;
