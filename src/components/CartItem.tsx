import { ReactElement, memo } from "react";
import { CartItemType } from "../context/CartContextProvider";
import { formatCurrrency } from "../utils/formatCurrency";
import { useCart } from "../hooks/useCart";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { dispatch } = useCart();
  const image = new URL(`../assets/${item.id}.png`, import.meta.url).href;
  const highestQuantity: number = 20 > item.quantity ? 20 : item.quantity;
  const optionValues: Array<number> = [...Array(highestQuantity).keys()].map(
    (_, idx) => idx + 1,
  );
  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val} gr.
      </option>
    );
  });

  const subtotal: number = item.quantity * item.price;

  const handleRemoveItem = (): void => {
    dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: item });
  };

  return (
    <li className="mb-2 flex flex-wrap items-center gap-4 bg-slate-100 p-2 text-sm md:gap-8 md:text-base">
      <img src={image} alt="cart item pic" className="w-[50px]" />
      <p>{item.name}</p>
      <p>{formatCurrrency(item.price)}</p>
      <select
        name="item-quantity"
        className="m-h-[48px]"
        area-label="Item quantity"
        value={item.quantity}
        onChange={(e) => {
          dispatch({
            type: "SET_QUANTITY",
            payload: { ...item, quantity: Number(e.target.value) },
          });
        }}
      >
        {options}
      </select>
      <p area-label="Cart Item Subtotal">total: {formatCurrrency(subtotal)}</p>
      <button
        onClick={handleRemoveItem}
        area-label="Remove Item From Cart"
        className="ml-auto"
      >
        ❌
      </button>
    </li>
  );
};

function areItemsEqual(
  { item: prevItem }: { item: CartItemType },
  { item: nextItem }: { item: CartItemType },
): boolean {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartItem = memo<typeof CartItem>(CartItem, areItemsEqual);

export default MemoizedCartItem;
