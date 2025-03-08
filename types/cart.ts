import { ProductType } from "./product";

export type CartItemType = ProductType & {
  quantity: number; // Cantidad del producto en el carrito
};
