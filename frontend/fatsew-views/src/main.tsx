import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { DataProvider } from "./contexts/dataContext.tsx";
import Users from "./pages/users/index.tsx";
import Products from "./pages/products/index.tsx";
import Shop from "./pages/shop/index.tsx";
import Customize from "./pages/customize/index.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/sign-in/index.tsx";
import SignUp from "./pages/sign-up/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <DataProvider>
        <AuthProvider>
          <Routes>
            <Route index element={<App />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </DataProvider>
    </StrictMode>
  </BrowserRouter>
);
