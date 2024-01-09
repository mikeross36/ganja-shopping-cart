import { useCart } from "../hooks/useCart";

const Footer = ({ isCartOpen }: { isCartOpen: boolean }): JSX.Element => {
  const { itemsTotal, cartTotal } = useCart();

  const pageContent = isCartOpen ? (
    <>
      <p className="my-8 py-8 text-center">
        <a href="https://www.vladimir-monarov.com/" target="_blank">
          &copy; Copyright 2024 DodaDesign
        </a>
      </p>
    </>
  ) : (
    <div>
      <p className="bg-slate-100 px-4 py-1 font-semibold tracking-wider">
        Cart Items: {itemsTotal}
      </p>
      <p className="bg-slate-100 px-4 py-1 font-semibold tracking-wider">
        Cart Total: {cartTotal}
      </p>
      <p className="my-8 py-8 text-center">
        <a href="https://www.vladimir-monarov.com/" target="_blank">
          &copy; Copyright 2024 DodaDesign
        </a>
      </p>
    </div>
  );
  return (
    <footer className="mx-auto my-0 flex max-w-[1060px] grow flex-col flex-nowrap justify-end gap-4 pb-12 pt-12">
      {pageContent}
    </footer>
  );
};

export default Footer;
