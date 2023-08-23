import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { categoryAction } from "../../redux";
import { Category } from "../Category/Category";

const Categories: FC = () => {
  const {categories} = useAppSelector(state => state.categoryReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoryAction.getAll());
  }, [dispatch]);

  return (
    <div>
      {categories.map(category => <Category key={category._id} category={category} />)}
    </div>
  );
};

export {
  Categories
};