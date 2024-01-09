import { HeaderPropsType } from "./Header";

const Navbar = ({
  isCartOpen,
  setIsCartOpen,
}: HeaderPropsType): JSX.Element => {
  const toggleButtons = isCartOpen ? (
    <button
      className="rounded-md border-2 border-solid border-slate-300 bg-slate-100 text-sm text-slate-500"
      onClick={() => setIsCartOpen(false)}
    >
      Product List
    </button>
  ) : (
    <button
      className="rounded-md border-2 border-solid border-slate-300 bg-slate-100 text-sm text-slate-500"
      onClick={() => setIsCartOpen(true)}
    >
      Open Cart
    </button>
  );
  return <nav className="flex justify-end gap-2">{toggleButtons}</nav>;
};

export default Navbar;
