import React, { FC, ReactNode } from "react";
import { useAppDispatch } from "../../hooks";

import { IItem } from "../../interfaces";
import { itemAction } from "../../redux";
import css from "./item.module.css";

interface IProps {
  item: IItem,
  children?: ReactNode
}

const Item: FC<IProps> = ({ item }) => {
  const { nameItem, color, count, material, price, size } = item;
  const dispatch = useAppDispatch();

  return (
    <div className={css.itemCard}>
      <div>Назва товару: {nameItem}</div>
      <div>color: {color}</div>
      <div>count: {count}</div>
      <div>material: {material}</div>
      <div>price: {price}</div>
      <div>size: {size}</div>
      <button onClick={() => dispatch(itemAction.update({ id: item._id, item }))}>update</button>
      <button onClick={() => dispatch(itemAction.remove(item._id))}>delete</button>

    </div>
  );
};

export { Item };
