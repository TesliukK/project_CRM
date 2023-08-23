import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div>
      <Outlet/>
      AuthLayout
    </div>
  );
};

export { AuthLayout };