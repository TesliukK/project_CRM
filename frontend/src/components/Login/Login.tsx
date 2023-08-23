import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICredentials } from "../../interfaces";
import { authService } from "../../services";
import css from "./login.module.css";

const Login: FC = () => {
  const { register, handleSubmit } = useForm<ICredentials>();
  const navigate = useNavigate();
  const onSubmit = async (data: ICredentials) => {
    try {
      await authService.login(data);
      navigate("/items")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div >
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.card}>
            <p className={css.signup}>вхід</p>
            <div className={css.inputBox}>
              <input className={css.input} type="text" placeholder={"email"} {...register("email")} />
            </div>

            <div className={css.inputBox}>
              <input className={css.input} type="text" placeholder={"пароль"} {...register("password")} />
            </div>

            <button className={css.enter}>Увійти</button>

          </div>
      </form>
    </div>
  );
};

export { Login };