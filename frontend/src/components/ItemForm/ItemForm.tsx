import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IItem } from "../../interfaces";
import { itemAction, RootState } from "../../redux";
import css from "./itemForm.module.css";



const ItemForm: FC = () => {
  const { reset, handleSubmit, register,setValue, formState: {errors, isValid} } = useForm<IItem>();
  const dispatch = useAppDispatch();
  const save: SubmitHandler<IItem> = async (item) => {
    await dispatch(itemAction.create({ item }));
    reset();
  };
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { updateItem } = useAppSelector((state ) => state.itemReducer);
  useEffect(() => {
    if (updateItem) {
      setValue('brand', updateItem.brand, {shouldValidate: true})
      setValue('price', updateItem.price, {shouldValidate: true})
      setValue('nameItem', updateItem.nameItem, {shouldValidate: true})
    }
  }, [updateItem])

 const update = async (item: IItem) => {
   if (updateItem) {
     await dispatch(itemAction.update({ id: updateItem._id, item }));
     reset();
   }
  }
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className={css.container}>
      <button className={css.button} onClick={toggleFormVisibility}>
        додати товар
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit(updateItem ? save : update)}>
          <input type="text" placeholder={"categoryId"} {...register("categoryId")} />
          <input type="text" placeholder={"subCategoryId"} {...register("subCategoryId")} />
          <input type="text" placeholder={"назва"} {...register("nameItem")} />
          <input type="text" placeholder={"бренд"} {...register("brand")} />
          <input type="text" placeholder={"кількість"} {...register("count")} />
          <input type="text" placeholder={"розмір"} {...register("size")} />
          <input type="text" placeholder={"ціна"} {...register("price", { valueAsNumber: true })} />
          <input type="text" placeholder={"колір"} {...register("color")} />
          <input type="text" placeholder={"матеріал"} {...register("material")} />
          <button disabled={!isValid}>{updateItem ? 'update' : 'create'}</button>
        </form>)}
    </div>
  );
};

export { ItemForm };
