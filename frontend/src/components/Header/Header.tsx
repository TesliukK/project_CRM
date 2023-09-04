import React, { FC } from "react";
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
      <div className={css.block}>
        <h2>Mirella Moda</h2>
        <button className={css.enter} onClick={handleLogout}>вихід</button>
      </div>
    </div>
  );
};

export { Header };