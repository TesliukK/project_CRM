import React, { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import AddIcon from '@mui/icons-material/Add';
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
        <h2>CRM</h2>
      </div>
      <NavLink to={"/items"}>
        <div className={css.menuBlock}>
          <div className={css.icon}>
            <CheckroomIcon />
          </div>
          <div className={css.icon}>
            <b>Товар</b>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/users"}>
        <div className={css.menuBlock}>
          <div className={css.icon}>
            <PersonIcon />
          </div>
          <div className={css.icon}>
            <b>Продавці</b>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/categories"}>
        <div className={css.menuBlock}>
          <div className={css.icon}>
            <CategoryIcon />
          </div>
          <div className={css.icon}>
            <b>Категорії</b>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/sold"}>
        <div className={css.menuBlock}>
          <div className={css.icon}>
            <CategoryIcon />
          </div>
          <div className={css.icon}>
            <b>продані</b>
          </div>
        </div>
      </NavLink>
      <a className={css.logout} onClick={handleLogout}>
        <div className={css.signIn}>
          <div className={css.icon}>
            <LogoutIcon />
          </div>
          <div className={css.icon}>
            <b>ВИЙТИ</b>
          </div>
        </div>
      </a>

    </div>
  );
};

export { Sidebar };