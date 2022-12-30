'use client'
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Provider } from "react-redux";
import AuthGuard from "../../components/auth/auth-guard";
import DashHeading from "../../components/containers/dash-heading";
import GroupsContainer from "../../components/groups/groups-container";
import CreateGroupModal from "../../components/modals/create-group-modal";
import Heading3 from "../../components/text/heading-3";
import { store } from "../../redux/store";

const Dashboard = () => {
  return (
    <Provider store={store}>
      <AuthGuard>
        <DashHeading>
          <Heading3>Dashboard</Heading3>
        </DashHeading>
        <div className="text-slate-50">
          Show groups quick view/ overview
          show recent tasks
          show most active resources
        </div>
      </AuthGuard>
    </Provider>
  );
};

export default Dashboard;
