import { Checkbox } from "@mui/material";
import React, { FC, ReactNode, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IItem } from "../../interfaces";
import { itemAction } from "../../redux";
import css from "./item.module.css";

interface IProps {
  item: IItem;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
  children?: ReactNode;
}

const Item: FC<IProps> = ({ item, isSelected, onSelect }) => {
  const { nameItem, color, count, material, price, size } = item;
  const currentPage = useAppSelector((state) => state.itemReducer.currentPage);
  const dispatch = useAppDispatch();

  const handleDeleteItem = () => {
    if (currentPage !== null) {
      dispatch(itemAction.remove({ id: item._id, page: currentPage }));
    }
  };

  return (
    <div className={css.itemCard}>
      <div className={css.itemDiv}>
        <Checkbox
          color={"primary"}
          checked={isSelected}
          onChange={() => onSelect(item._id)}
        />
        <div className={css.itemDiv}>
        </div>
      </div>

      <div className={css.itemDiv}>{nameItem}</div>
      <div className={css.itemDiv}>{color}</div>
      <div className={css.itemDiv}>{count}</div>
      <div className={css.itemDiv}>{material}</div>
      <div className={css.itemDiv}>{price}</div>
      <div className={css.itemDiv}>{size}</div>
      <div className={css.itemDiv}>
        <button
          onClick={() => dispatch(itemAction.setItemForUpdate({ id: item._id, item }))}
        >
          update
        </button>
      </div>
    </div>
  );
};

export { Item };
