import React, { FC } from "react";
import { render } from "react-dom";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { authService } from "../../services";

import css from "./header.module.css";

const Header: FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      authService.logout();
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={css.header}>
      <div>
        <button className={css.enter} onClick={handleLogout}>вихід</button>
      </div>
    </div>
  );
};

export { Header };