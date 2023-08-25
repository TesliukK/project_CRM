import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ICredentials } from "../../interfaces";
import { authService } from "../../services";
import css from "./login.module.css";

const Login: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<ICredentials>();
  const navigate = useNavigate();
  const onSubmit = async (data: ICredentials) => {
    try {
      await authService.login(data);
      navigate("/items");
    } catch (e) {
      setError("Неправильний email або пароль");
      console.log(e);
    }
  };

  return (
    <div >
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.card}>
            <div className={css.mirella}>
              <h1 className={css.h}>Mirella Moda</h1>
            </div>
            <div className={css.inputBox}>
              <input className={css.input} type="text" placeholder={"email"} {...register("email")} />
            </div>

            <div className={css.inputBox}>
              <input className={css.input} type="text" placeholder={"пароль"} {...register("password")} />
            </div>
            {error && <div className={css.error}>{error}</div>}
            <button className={css.enter}>Увійти</button>

          </div>
      </form>
    </div>
  );
};

export { Login };