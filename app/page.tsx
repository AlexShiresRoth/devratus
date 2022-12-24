import React from "react";


export default async function Landing() {

  

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col relative items-start">
        <h1 className="font-bold text-7xl text-slate-200 relative z-10 ">
          Welcome to Devratus
        </h1>
        <span className="bg-sky-400 h-4  flex px-4 w-full absolute bottom-3 -left-2" />
      </div>
      <h3 className="font-semibold text-2xl text-slate-500">
        The developer tool apparatus
      </h3>
      <p className="text-slate-600">Store all the necessary tools you use!</p>

    </div>
  );
}
