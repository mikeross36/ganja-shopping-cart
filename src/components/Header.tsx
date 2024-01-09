import Navbar from "./Navbar";
import { useCart } from "../hooks/useCart";

export type HeaderPropsType = {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderPropsType> = ({
  isCartOpen,
  setIsCartOpen,
}): JSX.Element => {
  const { itemsTotal, cartTotal } = useCart();
  return (
    <header className="sticky top-0 z-10 mx-auto my-0 bg-lime-700 px-2 py-3 text-white drop-shadow-xl md:max-w-[1060px] md:px-8">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ganja Webshop</h1>
        <div className="text-right">
          <p className="py-1 font-semibold tracking-wider">
            Cart Items:{" "}
            <span className="rounded-full bg-red-700 px-1  text-white">
              {itemsTotal}
            </span>
          </p>
          <p className="py-1 font-semibold tracking-wider">
            Cart Total: {cartTotal}
          </p>
        </div>
      </div>
      <Navbar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
    </header>
  );
};

export default Header;
