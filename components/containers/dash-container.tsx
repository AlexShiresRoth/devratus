import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { AiOutlineCluster } from "react-icons/ai";
import DashboardGroups from "../groups/dashboard-groups";
import DashboardResources from "../resources/dashboard-resources";
const DashContainer = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-11/12 flex items-center my-6 gap-4">
        <DashboardGroups />
        <DashboardResources />
      </div>
    </div>
  );
};

export default DashContainer;
