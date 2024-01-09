import { ReactElement } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import Product from "./Product";

const ProductList = () => {
  const { products } = useProducts();
  const { cart } = useCart();
  let sceneContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (products?.length) {
    sceneContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.id === product.id);
      return <Product key={product.id} inCart={inCart} product={product} />;
    });
  }
  return (
    <main className="mx-auto my-0 grid max-w-[1060px] justify-center gap-4 pt-12 md:grid-cols-3">
      {sceneContent}
    </main>
  );
};

export default ProductList;
