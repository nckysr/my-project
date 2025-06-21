import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full h-[80px] flex shadow-2xl bg-green-800">
      <img
        src="/logo.jpg"
        alt="logo"
        className="w-[110px] h-[80px] object-cover cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="w-[calc(100%-160px)] h-full font-bold text-[20px]  bg-amber-800 flex justify-center items-center">
        <Link to="/" className="mx-2">Home </Link>
        <Link to="/contact"  className="mx-2">Contact </Link>
        <Link to="/all-products"  className="mx-2">Product </Link>
        <Link to="/about"  className="mx-2">About </Link>
      </div>
      <div className="w-[80px]  bg-red-600"></div>
    </header>
  );
}
