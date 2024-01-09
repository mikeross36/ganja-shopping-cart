import { createContext, useState, useEffect } from "react";

export type ProductType = {
  id: string;
  name: string;
  thc: string;
  price: number;
};

export type ProductsContextType = {
  products: ProductType[];
};

const initialState: ProductType[] = [];

const initialContextState: ProductsContextType = { products: [] };

const ProductsContext = createContext(initialContextState);

type PropsType = {
  children: React.ReactNode;
};

export const ProductsContextProvider = ({ children }: PropsType) => {
  const [products, setProducts] = useState(initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Unable to fetch products!");
        const data = await response.json();
        setProducts(data);
        // console.log(data);
      } catch (err) {
        if (err instanceof Error) throw new Error(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
