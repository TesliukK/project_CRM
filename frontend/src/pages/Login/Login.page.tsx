import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Login } from "../../components";
import css from "./loginPage.module.css";

const LoginPage:FC = () => {
  return (
    <div className={css.container}>
      <Outlet/>
      <Login/>
    </div>
  );
};

export { LoginPage };