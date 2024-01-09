import { useContext } from "react";
import ProductsContext from "../context/ProductContextProvider";
import { ProductsContextType } from "../context/ProductContextProvider";

export const useProducts = (): ProductsContextType => {
  return useContext(ProductsContext);
};
