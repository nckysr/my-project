import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function ProductOverView() {
  const param = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const productId = param.id;

  useEffect(() => {
    if (loading == true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
        .then((response) => {
          setProducts(response.data);
          toast.success("Product loaded successfully!");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => setLoading(false));
    }
  }, [loading]);
  return (
    <div>
      ProductOverView
      {JSON.stringify(products)}
    </div>
  );
}
