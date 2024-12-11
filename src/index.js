import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RegistrationForm from "./Registration";
import CategoryForm from "./CategoryForm";
import CategoryUpdate from "./CategoryUpdate";
import Store from "./Store";
import Cart from "./Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <RegistrationForm />
    <CategoryForm />
    <CategoryUpdate />
    <Store />
    <Cart />
  </React.StrictMode>
);


