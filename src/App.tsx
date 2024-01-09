import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

export default function App(): JSX.Element {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const pageContent = isCartOpen ? <Cart /> : <ProductList />;
  return (
    <div className="md:px-4">
      <Header isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      {pageContent}
      <Footer isCartOpen={isCartOpen} />
    </div>
  );
}
