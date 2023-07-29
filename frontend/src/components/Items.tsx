import React, { FC, useEffect, useState } from "react";
import { IItem } from "../interfaces";
import { itemService } from "../services";
import { Item } from "./Item";

const Items: FC = () => {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    itemService.getAll().then(({ data }) => console.log(setItems(data)));
  }, []);
  return (
    <div>
      {items.map(item => <Item item={item} key={item._id}/>)}
    </div>
  );
};

export {
  Items
};