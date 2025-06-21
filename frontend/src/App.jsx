import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import SingUpPage from "./pages/signUpPage";
import HomePage from "./pages/homePage";
import AdminPage from "./pages/admin/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";
import AddProductForm from "./pages/admin/addProductPage";
import AddProductPage from "./pages/admin/addProductPage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <div>
          <Routes path="/*">
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SingUpPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/testing" element={<TestPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
//https://gnioxlulczbvkqyzquky.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaW94bHVsY3pidmtxeXpxdWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTg3NDksImV4cCI6MjA2NTg5NDc0OX0.zSm6-4M6OuKKKUbF2uwL2cBwto-7yKK3krGLhdUcM1A
