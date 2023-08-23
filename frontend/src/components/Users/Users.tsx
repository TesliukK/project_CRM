import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { userAction } from "../../redux";
import { Item } from "../Item/Item";
import { User } from "../User/User";

const Users: FC = () => {
  const {users} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userAction.getAll());
  }, [dispatch]);

  return (
    <div>
      {users.map(user => <User key={user._id} user={user} />)}
    </div>
  );
};

export {
  Users
};