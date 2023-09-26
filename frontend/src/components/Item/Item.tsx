import { Checkbox } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { ICategory, IItem } from "../../interfaces";
import { itemAction } from "../../redux";
import css from "./item.module.css";

interface IProps {
  item: IItem;
  isSelected: boolean;
  onSelect: (itemId: string) => void;
  children?: ReactNode;
}

const Item: FC<IProps> = ({ item, isSelected, onSelect }) => {
  const { category, itemName, brand, article, price, size, count,department } = item;
  const dispatch = useAppDispatch();

  const handleCheckboxClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onSelect(item._id);
  };

  return (
    <div>
      <NavLink
        className={css.itemCard}
        to={"/itemInfo"}
        onClick={() => dispatch(itemAction.setSelectedItem(item))}
      >
        <div className={css.itemDiv}>
          <Checkbox
            onClick={(e) => handleCheckboxClick(e)}
            color={"primary"}
            checked={isSelected}
            onChange={() => onSelect(item._id)}
          />
        </div>
        <div className={css.itemDiv}>{itemName}</div>
        <div className={css.itemDiv}>{brand}</div>
        <div className={css.itemDiv}>{article}</div>
        <div className={css.itemDiv}>{size}</div>
        <div className={css.itemDiv}>{count} шт.</div>
        <div className={css.itemDiv}>{price} грн.</div>
        <div className={css.itemDiv}>{category}</div>
        <div className={css.itemDiv}>{department}</div>
      </NavLink>
    </div>
  );
};

export { Item };
