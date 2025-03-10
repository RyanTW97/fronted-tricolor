import { ProductType } from "./product";

export type CartItemType = ProductType & {
  quantity: number;
};
