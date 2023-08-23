import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { FC, useState } from "react";
import { IUser } from "../../interfaces";
import { authService } from "../../services";

const Register: FC = () => {

  const {register, handleSubmit} = useForm<IUser>();
  const [error, setError] = useState(null);
  const registerUser: SubmitHandler<IUser> = async (user) => { // Вказуємо тип даних для registerUser
    try {
      await authService.register(user);
    } catch (e) {
    }
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(registerUser)}>
          <input type="text" placeholder={'firstName'} {...register('firstName')}/>
          <input type="text" placeholder={'secondName'} {...register('secondName')}/>
          <input type="text" placeholder={'email'} {...register('email')}/>
          <input type="text" placeholder={'password'} {...register('password')}/>
          <input type="text" placeholder={'phone'} {...register('phone')}/>
          <button>Register</button>
        </form>
      </div>
      {error&&<div>{JSON.stringify(error)}</div>}
    </div>
  );
};

export {Register};