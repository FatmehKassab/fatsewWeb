import React, { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use react-router-dom here
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store.js";
import "./tailwind.css";
import App from "./App.jsx";
import Products from "./pages/products/index.jsx";
import Shop from "./pages/shop/index.jsx";
import Customize from "./pages/customize/index.jsx";
import SignIn from "./pages/sign-in/index.jsx";
import SignUp from "./pages/sign-up/index.jsx";
import Cart from "./pages/cart/index.jsx";
import ProductList from "./pages/list/index.jsx";
import CheckAuth from "./components/common/check-auth";
import { checkAuth } from "./store/auth-slice";
import { Toaster } from "./components/ui/toaster.jsx";
import Checkout from "./pages/checkout/index.jsx";


function MainRouter() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="/products" element={<Products />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/customize" element={<Customize />} />
      <Route path="/list" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />

      <Route
        path="/"
        element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
      />
      <Route
        path="/sign-in"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <SignIn />
          </CheckAuth>
        }
      />
      <Route
        path="/sign-up"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <SignUp />
          </CheckAuth>
        }
      />
    </Routes>
  );
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <MainRouter />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
