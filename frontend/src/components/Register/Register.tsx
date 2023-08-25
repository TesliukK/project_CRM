import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { FC, useState } from "react";
import { IUser } from "../../interfaces";
import { authService } from "../../services";
import css from "./register.module.css";

const Register: FC = () => {

  const { register, handleSubmit } = useForm<IUser>();
  const [error, setError] = useState(null);
  const registerUser: SubmitHandler<IUser> = async (user) => { // Вказуємо тип даних для registerUser
    try {
      await authService.register(user);
    } catch (e) {
    }
  };
  return (
    <div>
      <div>
        <form className={css.form} onSubmit={handleSubmit(registerUser)}>
          <div className={css.card}>
            <div className={css.hBlock}>
              <h1 className={css.h}>Додати працівника</h1>
            </div>
            <div className={css.inputBox}>
              <input className={css.input} type="text" placeholder={"ім'я"} {...register("firstName")} />
            </div>
            <div className={css.inputBox}>
              <input className={css.input} type="text" placeholder={"призвіще"} {...register("secondName")} />
            </div>
            <div className={css.inputBox}>
              <input className={css.input} type="text" placeholder={"email"} {...register("email")} />
            </div>
            <div className={css.inputBox}>
              <input className={css.input} type="text" placeholder={"пароль"} {...register("password")} />
            </div>
            <div className={css.inputBox}>
              <input className={css.input} type="text" placeholder={"мобільний телефон"} {...register("phone")} />
            </div>
            <div className={css.inputBox}>
              <button className={css.enter}>Додати</button>
            </div>
          </div>
        </form>
      </div>
      {error && <div>{JSON.stringify(error)}</div>}
    </div>
  );
};

export { Register };