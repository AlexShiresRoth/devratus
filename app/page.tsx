import React from "react";
import PageContainer from "../components/containers/page-container";
import Nav from "../components/navigation/nav";

export default async function Landing() {
  return (
    <section className="flex">
      <Nav />
      <PageContainer>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col relative items-start">
            <h1 className="font-bold text-6xl text-slate-400 relative z-10 ">
              Welcome to Devratus
            </h1>
            <span className="bg-sky-300 h-4  flex px-4 w-full absolute bottom-1 -left-2" />
          </div>
          <h3 className="font-semibold text-2xl text-slate-500">
            The developer tool apparatus
          </h3>
          <p className="text-slate-600">
            Store all the necessary tools you use!
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
