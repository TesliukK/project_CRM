import React, { FC } from "react";
import { ItemForm } from "../ItemForm/ItemForm";

import css from "./header.module.css";

const   Header: FC = () => {
  return (
    <div className={css.header}>
      <div><ItemForm/></div>
    </div>
  );
};

export { Header };