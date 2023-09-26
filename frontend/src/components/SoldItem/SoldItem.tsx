// import { FC, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useAppDispatch } from "../../hooks";
// import { ISoldItem } from "../../interfaces";
// import { itemAction, soldItemAction } from "../../redux";
//
// const SoldItem: FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // Додали стан для відстеження відкритості меню
//   const { reset, handleSubmit, register, formState: { errors, isValid } } = useForm<ISoldItem>();
//   const dispatch = useAppDispatch();
//
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen); // Перемикаємо стан відкритості меню
//   };
//
//   const save: SubmitHandler<ISoldItem> = async (soldItem) => {
//     try {
//       await dispatch(soldItemAction.create({ soldItem }));
//       reset();
//       setIsMenuOpen(false); // Закриваємо меню після успішного створення
//     } catch (error) {
//       console.error("Помилка при створенні айтема:", error);
//     }
//   };
//
//
//   return (
//     <div>
//       <button onClick={toggleMenu}>продано</button>
//       {isMenuOpen && ( // Перевіряємо стан для відображення меню
//         <div>
//           <form onSubmit={handleSubmit(save)}>
//             {/*<input type="text" placeholder="Категорія ID" {...register("categoryId._id", { required: true })} />*/}
//             <input type="text" placeholder={"itemName"} {...register("itemId")} />
//             {/*<input type="text" placeholder={"бренд"} {...register("sellerId")} />*/}
//             <input type="text" placeholder={"артикул"} {...register("price")} />
//             <input type="text" placeholder={"розмір"} {...register("quantity")} />
//             <button disabled={!isValid}>Створити</button>
//           </form>
//         </div>
//
//       )}
//     </div>
//   );
// };
//
// export { SoldItem };
import React, { FC, ReactNode } from "react";
import { useAppSelector } from "../../hooks";



import { ISoldItem, IUser } from "../../interfaces";


interface IProps {
  soldItem: ISoldItem;
  children?: ReactNode;
}

const SoldItem: FC<IProps> = ({ soldItem }) => {
  const { _id,itemId,sellerId,price,quantity,soldAt } = soldItem;
  const soldDate = new Date(soldAt);

  const day = soldDate.getDate().toString().padStart(2, "0");
  const month = (soldDate.getMonth() + 1).toString().padStart(2, "0");
  const year = soldDate.getFullYear();
  const hours = soldDate.getHours().toString().padStart(2, "0");
  const minutes = soldDate.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  const user: IUser | undefined = useAppSelector((state) =>
    state.userReducer.users.find((user) => user._id === sellerId)
  );
  return (
    <div>
      <div>{_id}</div>
      <div>{itemId}</div>
      <div>{user ? `${user.firstName} ${user.email}` : ""}</div>
      <div>{price}</div>
      <div>{quantity}</div>
      <div>{formattedDate}</div>
     <hr/>
    </div>
  );
};

export { SoldItem };
