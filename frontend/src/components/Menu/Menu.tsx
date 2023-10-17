import React, { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import LogoutIcon from "@mui/icons-material/Logout";

import { authService } from "../../services";
import css from "./menu.module.css";

const Sidebar: FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      authService.logout();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={css.block}>
      <div className={css.h2}>
        <h1>CRM</h1>
      </div>
      <NavLink to={"/items"}>
        <div className={css.menuBlock}>
          <div className={css.icon}>
            <CheckroomIcon fontSize={"large"}/>
          </div>
          <div className={css.icon}>
            <h2>Товар</h2>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/users"}>
        <div className={css.menuBlock}>
          <div className={css.icon}>
            <PersonIcon fontSize={"large"}/>
          </div>
          <div className={css.icon}>
            <h2>Продавці</h2>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/sold"}>
        <div className={css.menuBlock}>
          <div className={css.icon}>
            <CategoryIcon fontSize={"large"}/>
          </div>
          <div className={css.icon}>
            <h2>продані</h2>
          </div>
        </div>
      </NavLink>
      <a className={css.logout} onClick={handleLogout}>
        <div className={css.signIn}>
          <div className={css.icon}>
            <LogoutIcon fontSize={"large"}/>
          </div>
          <div className={css.icon}>
            <h2>ВИЙТИ</h2>
          </div>
        </div>
      </a>

    </div>
  );
};

export { Sidebar };