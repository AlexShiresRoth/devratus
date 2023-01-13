import React from "react";
import useFetchGroups from "../../custom-hooks/useFetchGroups";
import { GrGroup } from "react-icons/gr";
const DashContainer = () => {
  const { groups } = useFetchGroups();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 flex items center my-6">
        <div className="rounded bg-slate-600 p-4 flex flex-col items-center">
          <GrGroup className="font-2xl text-slate-50" />
          <h4 className="text-slate-100 font-bold text-xl">
            Groups: {groups?.length}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DashContainer;
