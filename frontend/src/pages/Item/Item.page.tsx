import React, { FC } from "react";

import css from "./itemPage.module.css";
import { Header, ItemForm, Items, SoldItem } from "../../components";

const ItemPage: FC = () => {
  return (
    <div className={css.container}>
      <div><ItemForm/></div>
      <div><Header/></div>
      <div><Items /></div>
    </div>
  );
};

export { ItemPage };
