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

  const save: SubmitHandler<IItem> = async (item) => {
    try {
      await dispatch(itemAction.create(item));
      reset();
      setIsMenuOpen(false); // Закриваємо меню після успішного створення
    } catch (error) {
      console.error("Помилка при створенні айтема:", error);
    }
  };

  return (
    <div className={css.container}>
      <button onClick={toggleMenu}>додати товар</button>
      {isMenuOpen && ( // Перевіряємо стан для відображення меню
        <div className={css.form}>
          <form onSubmit={handleSubmit(save)}>
            {/*<input type="text" placeholder="Категорія ID" {...register("categoryId._id", { required: true })} />*/}
            <input type="text" placeholder={"itemName"} {...register("itemName")} />
            <input type="text" placeholder={"бренд"} {...register("brand")} />
            <input type="text" placeholder={"артикул"} {...register("article")} />
            <input type="text" placeholder={"розмір"} {...register("size")} />
            <input type="text" placeholder={"ціна"} {...register("price", { valueAsNumber: true })} />
            <input type="text" placeholder={"кількість"} {...register("count")} />
            <button disabled={!isValid}>Створити</button>
          </form>
        </div>

      )}
    </div>
  );
};

export { ItemForm };
