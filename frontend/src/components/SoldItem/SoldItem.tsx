import React, { FC, ReactNode } from "react";

import { ISoldItem } from "../../interfaces";


interface IProps {
  soldItem: ISoldItem;
  children?: ReactNode;
}

const SoldItem: FC<IProps> = ({ soldItem }) => {
  const { _id,itemId, seller:{email,firstName,secondName},price,quantity,soldAt } = soldItem;
  const soldDate = new Date(soldAt);

  const day = soldDate.getDate().toString().padStart(2, "0");
  const month = (soldDate.getMonth() + 1).toString().padStart(2, "0");
  const year = soldDate.getFullYear();
  const hours = soldDate.getHours().toString().padStart(2, "0");
  const minutes = soldDate.getMinutes().toString().padStart(2, "0");
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return (
    <div>
      <div>{_id}</div>
      <div>{itemId}</div>
      <div>{price}</div>
      <div>{quantity}</div>
      <div>{formattedDate}</div>
      <div>
        user
        <div>{email}</div>
        <div>{firstName}</div>
        <div>{secondName}</div>
      </div>

     <hr/>
    </div>
  );
};

export { SoldItem };
