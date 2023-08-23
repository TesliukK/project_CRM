import React, { FC } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { authService } from "../../services";

import css from "./header.module.css";
const Header:FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      authService.logout();
      navigate('/login');
    }catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={css.header}>
      <div>
        <button onClick={handleLogout}>logout</button>
        <NavLink to={'/items'}>Items</NavLink>
        <NavLink to={'/register'}>Register</NavLink>
        <NavLink to={'/createItem'}>додати товар</NavLink>
        <NavLink to={'/users'}>Users</NavLink>
        <NavLink to={'/categories'}>Categories</NavLink>

      </div>
    </div>
  );
};

export { Header };