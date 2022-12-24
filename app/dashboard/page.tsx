import React from "react";
import AuthGuard from "../../components/auth/auth-guard";
import Heading3 from "../../components/text/heading-3";

const Dashboard = () => {
  return (
    <AuthGuard>
      <div className="w-full flex justify-between items-center border-b-2 border-b-sky-800/80 px-10 pb-4">
        <Heading3>Dashboard</Heading3>
        <div>
          <button className="p-2 text-xs bg-sky-500 rounded text-slate-50 font-bold hover:bg-sky-800 transition-all">Add Grouping</button>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
