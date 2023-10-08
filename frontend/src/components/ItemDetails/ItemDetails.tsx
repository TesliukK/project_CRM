import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IItem } from "../../interfaces";
import { itemAction } from "../../redux";
import css from "./itemInfo.module.css";

const ItemDetails: FC = () => {
  const {
    reset,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<IItem>();
  const { selectedItem } = useAppSelector((state) => state.itemReducer);
  const { updateItem } = useAppSelector((state) => state.itemReducer);
  const dispatch = useAppDispatch();
  const [savedItem, setSavedItem] = useState<IItem | null>(null);

  useEffect(() => {
    // Збереження вибраного елемента в локальному сховищі після зміни selectedItem
    if (selectedItem) {
      localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
      setSavedItem(selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    // Передавання значень до форми при зміні updateItem
    if (updateItem) {
      // setValue("categoryId._id", updateItem.categoryId.name);
      setValue("itemName", updateItem.itemName);
      setValue("brand", updateItem.brand);
      setValue("price", updateItem.price);
      setValue("size", updateItem.size);
      setValue("count", updateItem.count);
      setValue("article", updateItem.article);
    }
  }, [updateItem, setValue]);

  const update = async (item: IItem) => {
    if (updateItem) {
      await dispatch(itemAction.update({ id: updateItem._id, item }));
      reset();
      // setValue("categoryId._id", item.categoryId.name);
      setValue("itemName", item.itemName);
      setValue("brand", item.brand);
      setValue("price", item.price);
      setValue("size", item.size);
      setValue("count", item.count);
      setValue("article", item.article);
    }
  };

  return (
    <div>
      {savedItem && (
        <div className={css.cont}>
          <button onClick={() => dispatch(itemAction.setItemForUpdate(savedItem))}>
            update
          </button>
          <h2>ДЕТАЛІ</h2>
          <form onSubmit={handleSubmit(update)}>
            {/*<input*/}
            {/*  type="text"*/}
            {/*  placeholder="категорія"*/}
            {/*  defaultValue={savedItem.categoryId?.name || ""}*/}
            {/*  {...register("categoryId._id")}*/}
            {/*/>*/}
            <input
              type="text"
              placeholder="назва"
              defaultValue={savedItem.itemName || ""}
              {...register("itemName")}
            />
            <input
              type="text"
              placeholder="бренд"
              defaultValue={savedItem.brand || ""}
              {...register("brand")}
            />
            <input
              type="text"
              placeholder="артикул"
              defaultValue={savedItem.article || ""}
              {...register("article")}
            />
            <input
              type="text"
              placeholder="розмір"
              defaultValue={savedItem.size || ""}
              {...register("size")}
            />
            <input
              type="text"
              placeholder="ціна"
              defaultValue={savedItem.price || ""}
              {...register("price", { valueAsNumber: true })}
            />
            <input
              type="text"
              placeholder="кількість"
              defaultValue={savedItem.count || ""}
              {...register("count")}
            />
            <button disabled={!isValid}>Оновити</button>
          </form>
        </div>
      )}
    </div>
  );
};

export { ItemDetails };
