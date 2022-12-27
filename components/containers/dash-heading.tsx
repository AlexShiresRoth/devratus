import React from "react";

const DashHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-b-sky-800/80 px-10 pb-4">
      {children}
    </div>
  );
};

export default DashHeading;
