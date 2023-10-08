import React, { FC, ReactNode } from "react";
import { useAppDispatch } from "../../hooks";

import { IUser } from "../../interfaces";
import { userAction } from "../../redux";

interface IProps {
  user: IUser,
  children?: ReactNode
}

const User: FC<IProps> = ({ user }) => {
  const { firstName,secondName,phone,role } = user;
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
