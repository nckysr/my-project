import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/productCard";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading == true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error("Failed to fetch products:", error);
          setError("Failed to load products. Please try again later.");
        })
        .finally(() => setLoading(false));
    }
  }, [loading]);
  return (
    <div className="w-full h-full flex flex-wrap shadow-amber-600 justify-center items-center gap-1 ">
      {products.map((product) => {
        return <ProductCard key={product._id} {...product}  />;
      })}
    </div>
  );
}
