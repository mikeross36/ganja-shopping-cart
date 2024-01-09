import { useContext } from "react";
import CartContext, { CartContextType } from "../context/CartContextProvider";

export const useCart = (): CartContextType => {
  return useContext(CartContext);
};
