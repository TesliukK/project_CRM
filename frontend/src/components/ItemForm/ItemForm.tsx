import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "../../hooks";
import { IItem } from "../../interfaces";
import { itemAction } from "../../redux";
import css from "./itemForm.module.css";


const ItemForm: FC = () => {
  const { reset, handleSubmit, register } = useForm<IItem>();
  const dispatch = useAppDispatch();
  const save: SubmitHandler<IItem> = async (item) => {
    await dispatch(itemAction.create({ item }));
    reset();
  };
  const [isFormVisible, setIsFormVisible] = useState(false); // Стан для визначення видимості форми

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Функція для зміни стану видимості форми
  };

  return (
    <div className={css.container}>
      <button className={css.button} onClick={toggleFormVisibility}>
        додати товар
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit(save)}>
          <input type="text" placeholder={"categoryId"} {...register("categoryId")} />
          <input type="text" placeholder={"subCategoryId"} {...register("subCategoryId")} />
          <input type="text" placeholder={"назва"} {...register("nameItem")} />
          <input type="text" placeholder={"бренд"} {...register("brand")} />
          <input type="text" placeholder={"кількість"} {...register("count")} />
          <input type="text" placeholder={"розмір"} {...register("size")} />
          <input type="text" placeholder={"ціна"} {...register("price", { valueAsNumber: true })} />
          <input type="text" placeholder={"колір"} {...register("color")} />
          <input type="text" placeholder={"матеріал"} {...register("material")} />
          <button>додати</button>
        </form>)}
    </div>
  );
};

export { ItemForm };
