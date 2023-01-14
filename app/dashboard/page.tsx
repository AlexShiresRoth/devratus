import React from "react";
import AuthGuard from "../../components/auth/auth-guard";
import DashContainer from "../../components/containers/dash-container";
import DashHeading from "../../components/containers/dash-heading";
import Heading3 from "../../components/text/heading-3";

const Dashboard = async () => {
  return (
    <AuthGuard>
      <DashHeading>
        <Heading3>Dashboard</Heading3>
      </DashHeading>
      <DashContainer />
    </AuthGuard>
  );
};

export default Dashboard;
