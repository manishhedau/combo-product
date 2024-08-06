import React from "react";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import ProductDetailPage from "./pages/ProductDetailPage";
import ComboDeal from "./pages/ComboDeal";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="container w-full">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/products" replace={true} />}
          />
          <Route
            path="/products"
            element={
              <>
                <Outlet />
              </>
            }
          >
            <Route index element={<Products />} />

            <Route path=":productId" element={<ProductDetailPage />} />
          </Route>
          <Route path="/combo-products" element={<ComboDeal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
