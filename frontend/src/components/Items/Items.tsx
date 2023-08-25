import { Pagination } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { itemAction } from "../../redux";
import { Item } from "../Item/Item";
import css from "./items.module.css";

const Items: FC = () => {
  const { items, page, totalPages } = useAppSelector(state => state.itemReducer);
  const [query, setQuery] = useSearchParams({ page: "1" });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(itemAction.getAll({ page: Number(query.get("page")) }));
  }, [dispatch, query]);

  const handlePageChange = (newPage: number) => {
    setQuery({ page: newPage.toString() });
  };

  return (
    <div className={css.block}>
      <div className={css.nameBlock}>
        <div className={css.par}></div>
        <div className={css.par}><b>назва</b></div>
        <div className={css.par}><b>колір</b></div>
        <div className={css.par}><b>кількість</b></div>
        <div className={css.par}><b>матеріал</b></div>
        <div className={css.par}><b>ціна</b></div>
        <div className={css.par}><b>розмір</b></div>
        <div className={css.par}></div>
      </div>

      <div>
        {items.map(item => <Item key={item._id} item={item} />)}
      </div>
      <div>
        <div>
          <Pagination
            count={totalPages||1}
            page={Number(query.get("page"))}
            onChange={(event, value) => handlePageChange(value)}
            disabled={page === null || page <= 0 || (totalPages !== null && page >= (totalPages + 1))}
            color="standard"
            shape="circular"
            size="large"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};

export {
  Items
};