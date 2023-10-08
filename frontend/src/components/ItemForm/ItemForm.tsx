import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "../../hooks";
import { IItem } from "../../interfaces";
import { itemAction } from "../../redux";
import css from "./itemForm.module.css";

const ItemForm: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Додали стан для відстеження відкритості меню
  const { reset, handleSubmit, register, formState: { errors, isValid } } = useForm<IItem>();
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Перемикаємо стан відкритості меню
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Закрити меню
  };

  const save: SubmitHandler<IItem> = async (item) => {
    try {
      await dispatch(itemAction.create(item));
      reset();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Помилка при створенні айтема:", error);
    }
  };

  return (
    <div className={css.container}>
      <button onClick={toggleMenu}>додати товар</button>
      {isMenuOpen && (
        <div className={css.overlay}>
          <div className={css.formDiv}>
            <form className={css.form} onSubmit={handleSubmit(save)}>
              <select {...register("category")} defaultValue="Товар" className={css.input}>
                <option value="Товар" disabled hidden>Оберіть категорію</option>
                <option value="Аксесуари">Аксесуари</option>
                <option value="Взуття">Взуття</option>
                <option value="Одяг">Одяг</option>
              </select>
              <select {...register("department")} defaultValue="" className={css.input}>
                <option value="" disabled hidden>Оберіть відділ</option>
                <option value="Mirella Moda">Mirella Moda</option>
                <option value="MiniMax">MiniMax</option>
              </select>
              <input className={css.input} type="text" placeholder={"itemName"} {...register("itemName")} />
              <input className={css.input} type="text" placeholder={"бренд"} {...register("brand")} />
              <input className={css.input} type="text" placeholder={"артикул"} {...register("article")} />
              <input className={css.input} type="text" placeholder={"розмір"} {...register("size")} />
              <input className={css.input} type="text"
                     placeholder={"ціна"} {...register("price", { valueAsNumber: true })} />
              <input className={css.input} type="text" placeholder={"кількість"} {...register("count")} />
              <button disabled={!isValid}>Створити</button>
            </form>
            <button type="button" onClick={closeMenu}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export { ItemForm };
