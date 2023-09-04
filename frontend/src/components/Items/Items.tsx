import { Pagination, Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { itemAction } from "../../redux";
import { Item } from "../Item/Item";
import css from "./items.module.css";

const Items: FC = () => {
  const { items, page, totalPages } = useAppSelector(
    (state) => state.itemReducer
  );
  const [query, setQuery] = useSearchParams({ page: "1" });
  const dispatch = useAppDispatch();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    dispatch(itemAction.getAll({ page: Number(query.get("page")) }));
  }, [dispatch, query]);

  const handlePageChange = (newPage: number) => {
    setQuery({ page: newPage.toString() });
  };

  const handleItemSelection = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteSelectedItems = () => {
    selectedItems.forEach((itemId) => {
      dispatch(itemAction.remove({ id: itemId, page: Number(query.get("page")) }));
    });
    setSelectedItems([]);
  };

  return (
    <div className={css.block}>
      <button
        onClick={handleDeleteSelectedItems}
        disabled={selectedItems.length === 0}
      >
        Видалити вибрані
      </button>
      <div className={css.nameBlock}>
        <div className={css.par}></div>
        <div className={css.par}>
          <b>назва</b>
        </div>
        <div className={css.par}>
          <b>колір</b>
        </div>
        <div className={css.par}>
          <b>кількість</b>
        </div>
        <div className={css.par}>
          <b>матеріал</b>
        </div>
        <div className={css.par}>
          <b>ціна</b>
        </div>
        <div className={css.par}>
          <b>розмір</b>
        </div>
        <div className={css.par}></div>
      </div>

      <div>
        {items.map((item) => (
          <Item
            key={item._id}
            item={item}
            isSelected={selectedItems.includes(item._id)}
            onSelect={handleItemSelection}
          />
        ))}
      </div>
      <div className={css.pagination}>
        <Pagination
          count={totalPages || 1}
          page={Number(query.get("page"))}
          onChange={(event, value) => handlePageChange(value)}
          disabled={
            page === null ||
            page <= 0 ||
            (totalPages !== null && page >= totalPages + 1)
          }
          color="standard"
          shape="circular"
          size="large"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export { Items };
