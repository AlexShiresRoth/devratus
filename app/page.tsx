import React from "react";

export default async function Landing() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col relative items-start border-b-[1px] border-sky-400">
        <h1 className="font-bold text-7xl text-slate-200 relative z-10 ">
          Welcome to Devratus
        </h1>
      </div>
      <h3 className="font-semibold text-2xl text-slate-500">
        The developer tool apparatus
      </h3>
      <p className="text-slate-600">Store all the necessary tools you use!</p>
    </div>
  );
}
