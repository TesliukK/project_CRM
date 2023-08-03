import React, { FC, useEffect, useState } from "react";
import { IItem } from "../interfaces";
import { itemService } from "../services";
import { Item } from "./Item";

const Items: FC = () => {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    itemService.getAll().then(({ data }) => setItems(data));
  }, []);
  return (
    <div>

      {items.map(item => <Item key={item._id} item={item} />)}
    </div>
  );
};

export {
  Items
};