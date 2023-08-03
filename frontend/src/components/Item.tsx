import React, { FC, ReactNode } from "react";
import { IItem } from "../interfaces";

interface IProps {
  item: IItem,
  children?: ReactNode
}

const Item: FC<IProps> = ({ item }) => {
  const { _id, nameItem, color, count, material, price, size } = item;
  return (
    <div>
      <p>Items list</p>
      <div>_id: {_id}</div>
      <div>nameItem: {nameItem}</div>
      <div>color: {color}</div>
      <div>count: {count}</div>
      <div>material: {material}</div>
      <div>price: {price}</div>
      <div>size: {size}</div>
    </div>
  );
};

export { Item };
