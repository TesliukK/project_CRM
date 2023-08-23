import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { itemAction } from "../../redux";
import { Item } from "../Item/Item";

const Items: FC = () => {
  const {items} = useAppSelector(state => state.itemReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
   dispatch(itemAction.getAll());
  }, [dispatch]);

  return (
    <div>
      {items.map(item => <Item key={item._id} item={item} />)}
    </div>
  );
};

export {
  Items
};