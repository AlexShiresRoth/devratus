"use client";
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
  const { data, status } = useSession();

  const [showCreateGroupModal, setShowCreateGroupModal] =
    useState<boolean>(false);

  return (
    <Provider store={store}>
      <AuthGuard>
        <DashHeading>
          <Heading3>Dashboard</Heading3>
          <div>
            <button
              className="p-2 text-xs bg-sky-500 rounded text-slate-50 font-bold hover:bg-sky-800 transition-all"
              onClick={() => setShowCreateGroupModal(!showCreateGroupModal)}
            >
              Add Grouping
            </button>
          </div>
        </DashHeading>
        <GroupsContainer userData={{ ...data, status }} />
        <CreateGroupModal
          isModalVisible={showCreateGroupModal}
          setModalVisibility={setShowCreateGroupModal}
        />
      </AuthGuard>
    </Provider>
  );
};

export default Dashboard;
