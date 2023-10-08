import React, { FC } from "react";

import css from "./itemPage.module.css";
import { Header, Items } from "../../components";

const ItemPage: FC = () => {
  return (
    <div className={css.container}>
      <div><Header/></div>
      <div><Items /></div>
    </div>
  );
};

export { ItemPage };
