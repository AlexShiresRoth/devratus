"use client";
import React, { useState } from "react";
import AuthGuard from "../../components/auth/auth-guard";
import DashHeading from "../../components/containers/dash-heading";
import CreateGroupModal from "../../components/modals/create-group-modal";
import Heading3 from "../../components/text/heading-3";

const Dashboard = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] =
    useState<boolean>(false);

  return (
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
      <CreateGroupModal
        isModalVisible={showCreateGroupModal}
        setModalVisibility={setShowCreateGroupModal}
      />
    </AuthGuard>
  );
};

export default Dashboard;
