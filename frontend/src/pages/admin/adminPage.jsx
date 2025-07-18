import { Link, Route, Routes } from "react-router-dom";
import AdminUserPage from "./userPage";
import AddProductPage from "./addProductPage";
import EditProductPage from "./editProductPage";
import ProductPage from "./ProductPage";
import EditUserPage from "./editUser";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex ">
      <div className="border-r-2 border-black h-full w-[200px] flex flex-col font-bold ">
        <Link to="/admin/users">user</Link>
        <Link to="/admin/products">product</Link>
        <Link to="/admin/orders">order</Link>
        <Link to="/admin/reviews">review</Link>
      </div>

      <div className="h-full w-[calc(100%-200px)]">
        <Routes path="/admin/*">
          <Route path="/users" element={<AdminUserPage />} />
          <Route path="/products" element={<  ProductPage/>} />
          <Route path="/add-products" element={<AddProductPage />} />          
          <Route path="/edit-products" element={<EditProductPage />} />
          <Route path="/edit-user/" element={<EditUserPage />} />
          <Route path="/orders" element={<h1>Orders</h1>} />
          <Route path="/reviews" element={<h1>Reviews</h1>} />
        </Routes>
      </div>
    </div>
  );
}
