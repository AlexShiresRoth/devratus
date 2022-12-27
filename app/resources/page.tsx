import React from "react";
import AuthGuard from "../../components/auth/auth-guard";
import DashHeading from "../../components/containers/dash-heading";
import Heading3 from "../../components/text/heading-3";

const Resources = () => {
  return (
    <AuthGuard>
      <DashHeading>
        <Heading3>Resources</Heading3>
      </DashHeading>
    </AuthGuard>
  );
};

export default Resources;
