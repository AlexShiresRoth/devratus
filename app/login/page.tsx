import React from "react";
import PageContainer from "../../components/containers/page-container";
import SignInForm from "../../components/forms/signin-form";
import Nav from "../../components/navigation/nav";
import Heading1 from "../../components/text/heading-1";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col relative items-start">
        <Heading1>
          Welcome Back
        </Heading1>
        <span className="bg-sky-400 h-4  flex px-4 w-full absolute bottom-1 -left-2" />
      </div>
     <h3>Log Back In</h3>
     <SignInForm />
    </div>
  );
};

export default LoginPage;
