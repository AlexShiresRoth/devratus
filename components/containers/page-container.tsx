import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageContainer = ({ children }: Props) => {
  return (
    <section className="w-full flex flex-col items-center bg-black min-h-screen py-6">
      <div className="w-full flex flex-col">{children}</div>
    </section>
  );
};

export default PageContainer;
