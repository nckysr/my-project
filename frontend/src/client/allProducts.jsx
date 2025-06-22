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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => {
        return <ProductCard key={product._id} {...product}  />;
      })}
    </div>
  );
}
