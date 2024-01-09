import { ProductType } from "../context/ProductContextProvider";
import { formatCurrrency } from "../utils/formatCurrency";
import { useCart } from "../hooks/useCart";
import { memo } from "react";

type PropsType = {
  product: ProductType;
  inCart: boolean;
};

const Product: React.FC<PropsType> = ({ product, inCart }) => {
  const { dispatch } = useCart();
  const image = new URL(`../assets/${product.id}.png`, import.meta.url).href;
  const itemInCart = inCart ? " Item in Cart ✔" : null;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <article className="mx-auto my-0 flex h-[17rem] min-w-[15rem] flex-col items-center gap-2 rounded-md border-2 border-solid border-slate-200 p-4">
      <h3 className="font-bold">{product.name}</h3>
      <img src={image} alt="product pic" className="w-24" />
      <p>thc: {product.thc}%</p>
      <p className="py-2 font-semibold">
        {formatCurrrency(product.price)}{" "}
        <span className="inline-block pl-2 text-lime-700">{itemInCart}</span>
      </p>
      <button
        onClick={handleAddToCart}
        className="rounded-md border-2 border-solid border-slate-300 bg-slate-100 text-sm text-slate-500"
      >
        Add to Cart
      </button>
    </article>
  );
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType,
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
