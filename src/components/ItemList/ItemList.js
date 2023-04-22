import React from "react";
import { memo } from "react";
import Item from "../Item/Item.js";

const ItemList = ({ products }) => {
  return (
    <ul>
      {products.map((item) => {
        return <Item key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default memo(ItemList);
