import { Pagination } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { soldItemAction } from "../../redux";
import { SoldItem } from "../SoldItem/SoldItem";

const SoldItems: FC = () => {
  const { soldItems, page, totalPages } = useAppSelector(
      (state) => state.soldItemReducer
  );
  const dispatch = useAppDispatch();
  const [query, setQuery] = useSearchParams({ page: "1" });

  const handlePageChange = (newPage: number) => {
    setQuery({ page: newPage.toString() });
  };

  useEffect(() => {
    dispatch(soldItemAction.getAll({ page: Number(query.get("page")) }));
  }, [dispatch, query]);

  return (
      <div>
        <div>
          {soldItems.map((soldItem) => (
              <SoldItem
                  key={soldItem._id}
                  soldItem={soldItem}
              />
          ))}
        </div>
        <div>
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
              shape="rounded"
              size="large"
              showFirstButton
              showLastButton
          />
        </div>
      </div>
  );
}

  export { SoldItems };