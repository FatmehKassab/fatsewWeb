import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { DataProvider } from "./contexts/dataContext.tsx";
import Users from "./pages/users/index.tsx";
import Products from "./pages/products/index.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <DataProvider>
        <Routes>
          <Route index element={<App />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/welcome" element={<Welcome />} />
        <Route path="/game" element={<Game />} />
        <Route path="/admin" element={<Admin />} /> */}
        </Routes>
      </DataProvider>
    </StrictMode>
  </BrowserRouter>
);
