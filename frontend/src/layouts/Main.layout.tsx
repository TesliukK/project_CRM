import React, { FC, useState } from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "../components";
import css from "./mainLayout.module.css"

const MainLayout: FC = () => {

  return (
    <div className={css.cont}>
      <div className={css.block}>
        <Sidebar/>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;