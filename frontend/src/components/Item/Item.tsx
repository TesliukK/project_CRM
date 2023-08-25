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
      <div className={css.itemDiv}><img  className={css.img} src="https://st2.depositphotos.com/4845131/7223/v/450/depositphotos_72231685-stock-illustration-icon-hangers.jpg" alt="одяг" /></div>
      <div className={css.itemDiv}>{nameItem}</div>
      <div className={css.itemDiv}>{color}</div>
      <div className={css.itemDiv}>{count}</div>
      <div className={css.itemDiv}>{material}</div>
      <div className={css.itemDiv}>{price}</div>
      <div className={css.itemDiv}>{size}</div>
      <div className={css.itemDiv}>
        <button onClick={() => dispatch(itemAction.update({ id: item._id, item }))}>update</button>
        <button onClick={() => dispatch(itemAction.remove(item._id))}>delete</button>
      </div>
    </div>
  );
};

export { Item };
