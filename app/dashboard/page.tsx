"use client";
import React from "react";
import { Provider } from "react-redux";
import AuthGuard from "../../components/auth/auth-guard";
import DashContainer from "../../components/containers/dash-container";
import DashHeading from "../../components/containers/dash-heading";
import Heading3 from "../../components/text/heading-3";
import { store } from "../../redux/store";

const Dashboard = () => {
  return (
    <Provider store={store}>
      <AuthGuard>
        <DashHeading>
          <Heading3>Dashboard</Heading3>
        </DashHeading>
        <DashContainer />
      </AuthGuard>
    </Provider>
  );
};

export default Dashboard;
