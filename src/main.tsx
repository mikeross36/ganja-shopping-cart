import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProductsContextProvider } from "./context/ProductContextProvider";
import { CartContextProvider } from "./context/CartContextProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductsContextProvider>
      <CartContextProvider>
        <ProductsContextProvider>
          <App />
        </ProductsContextProvider>
      </CartContextProvider>
    </ProductsContextProvider>
  </React.StrictMode>,
);
