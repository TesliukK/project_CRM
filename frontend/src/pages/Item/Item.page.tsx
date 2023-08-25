import React, { FC } from "react";

import css from "./itemPage.module.css";
import { ItemForm, Items } from "../../components";

const ItemPage: FC = () => {
  return (
    <div className={css.container}>
      <div><ItemForm /></div>
      <div><Items /></div>
    </div>
  );
};

export { ItemPage };
