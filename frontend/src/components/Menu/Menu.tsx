import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import css from "./menu.module.css";

const Sidebar: FC = () => {

  return (
    <div className={css.block}>
      <h2>Mirella Moda</h2>
      <NavLink to={"/items"}>
        <div className={css.menuBlock}>
          <b>Товар у наявності</b>
        </div>
      </NavLink>
      <NavLink to={"/users"}>
        <div className={css.menuBlock}>
          <b>Продавці</b>
        </div>
      </NavLink>
      <NavLink to={"/categories"}>
        <div className={css.menuBlock}>
          <b>Категорії</b>
        </div>
      </NavLink>
    </div>
  );
};

export { Sidebar };