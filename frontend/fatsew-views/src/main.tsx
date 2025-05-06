import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { DataProvider } from "./contexts/dataContext.tsx";
import Users from "./pages/users/index.tsx";
import Products from "./pages/products/index.tsx";
import Home from "./pages/home/index.tsx";
import Shop from "./pages/shop/index.tsx";
import Customize from "./pages/customize/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <DataProvider>
        <Routes>
          <Route index element={<App />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/customize" element={<Customize />} />
        </Routes>
      </DataProvider>
    </StrictMode>
  </BrowserRouter>
);
