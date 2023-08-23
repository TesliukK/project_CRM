import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Items } from "../components";

const ItemPage: FC = () => {
  return (
    <div>
      <Items/>
    </div>
  );
};

export { ItemPage };
