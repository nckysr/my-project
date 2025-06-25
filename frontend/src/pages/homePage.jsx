import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import AllProducts from "../client/allProducts";
import ProductOverView from "../client/productOverView";
import CartPage from "../client/cartPage";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <Header />
      <div className="w-full h-full flex flex-col items-center">
        <Routes path="/*">
          <Route path="/" element={<h1>HomePage</h1>} />
          <Route path="/all-products" element={<AllProducts/>} />
          <Route path="/overview/:id" element={<ProductOverView/>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/admin" element={<h1>About</h1>} />
          <Route path="/*" element={<h1>404 not found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
