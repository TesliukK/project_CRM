import React, { FC, ReactNode } from "react";
import { useAppDispatch } from "../../hooks";

import { IItem, IUser } from "../../interfaces";
import { itemAction, userAction } from "../../redux";
import css from "./item.module.css";

interface IProps {
  user: IUser,
  children?: ReactNode
}

const User: FC<IProps> = ({ user }) => {
  const { _id,firstName,secondName,phone,role } = user;
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>firstName: {firstName}</div>
      <div>secondName: {secondName}</div>
      <div>phone: {phone}</div>
      <div>role: {role}</div>
      <button onClick={() => user._id && dispatch(userAction.remove(user._id))}>delete</button>
      <hr/>
    </div>
  );
};

export { User };
