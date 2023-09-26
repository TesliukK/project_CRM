import React, { FC } from "react";

import { ItemDetails, ItemForm } from "../../components";
import css from "./itemInfo.page.module.css";

const ItemInfoPage: FC = () => {
  return (
    <div className={css.block}>
      <ItemDetails/>
    </div>
  );
};

export { ItemInfoPage };