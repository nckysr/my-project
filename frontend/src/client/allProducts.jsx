import axios from "axios";
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        });
    }
  }, [loading]);
  return (
    <div className="w-full h-full bg-amber-950">
      <h1>products  .ghkghkghkghkghkghkghkghka dfghkl;atusdjkqelfh;owrgfer;lhjfhasilrht;xd vkdfnjf;WRU</h1>
    </div>
  );
}
