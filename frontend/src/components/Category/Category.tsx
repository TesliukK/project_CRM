import React, { FC, ReactNode } from "react";
import { useAppDispatch } from "../../hooks";

import { ICategory } from "../../interfaces";
import { categoryAction } from "../../redux";

interface IProps {
  category: ICategory,
  children?: ReactNode
}

const Category: FC<IProps> = ({ category }) => {
  const {categoryName} = category;
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>Назва categoryName: {categoryName}</div>
      <button onClick={() => dispatch(categoryAction.remove(category._id))}>delete</button>

    </div>
  );
};

export { Category };
