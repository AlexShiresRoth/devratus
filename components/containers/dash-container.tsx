import React from "react";
import DashboardGroups from "../groups/dashboard-groups";
import DashboardResources from "../resources/dashboard-resources";
import MyTasksDashboard from "../tasks/my-tasks-dashboard";
const DashContainer = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-11/12 flex items-center my-6 gap-4'>
        <DashboardGroups />
        <DashboardResources />
        <MyTasksDashboard />
      </div>
    </div>
  );
};

export default DashContainer;
