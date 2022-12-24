import React from "react";
import AuthGuard from "../../components/auth/auth-guard";
import Heading3 from "../../components/text/heading-3";

const Resources = () => {
  return (
    <AuthGuard>
      <div className="w-full flex justify-between items-center border-b-2 border-b-sky-800/80 px-10 pb-4">
        <Heading3>Resources</Heading3>
      </div>
    </AuthGuard>
  );
};

export default Resources;
