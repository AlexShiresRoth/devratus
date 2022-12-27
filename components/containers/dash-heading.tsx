import React from "react";

const DashHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-center items-center border-b-2 border-b-sky-800/80  pb-4">
      <div className="w-11/12 flex justify-between items-center">
        {children}
      </div>
    </div>
  );
};

export default DashHeading;
