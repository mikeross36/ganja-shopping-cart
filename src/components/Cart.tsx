import { useState } from "react";
import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";

const Cart = () => {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const { cart, itemsTotal, cartTotal, dispatch } = useCart();

  const handleSubmitOrder = (): void => {
    dispatch({ type: "SUBMIT_ORDER" });
    setIsOrderConfirmed(true);
  };
  const sceneContent = isOrderConfirmed ? (
    <h2 className="text-center text-xl font-bold">Thank you for your order!</h2>
  ) : (
    <>
      <h1 className="text-center text-2xl font-bold">Your Cart</h1>
      <ul className="mt-2 p-0">
        {cart.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </ul>
      <div className="mt-10 flex flex-col gap-4 font-semibold">
        <p>Total Items: {itemsTotal}</p>
        <p>Cart Total: {cartTotal}</p>
        <button
          onClick={handleSubmitOrder}
          className="max-w-[10rem] rounded-md border-2 border-solid border-slate-400 bg-blue-800 text-sm text-white hover:bg-blue-700"
        >
          Submit Order
        </button>
      </div>
    </>
  );
  return (
    <main className="mx-auto my-0 flex max-w-[1060px] flex-col flex-nowrap gap-4 px-2 pt-12">
      {sceneContent}
    </main>
  );
};

export default Cart;
