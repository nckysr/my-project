import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/imageSlider";
import Loading from "../components/loading";

export default function ProductOverView() {
  const { id: productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        toast.success("Product loaded successfully!");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error loading product");
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <Loading />;

  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 h-full flex justify-center items-center">
        <ImageSlider images={product?.images || []} />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center bg-green-300">
        <div className="w-[500px] h-[600px] flex flex-col bg-red-300 items-center p-4 overflow-auto">
          <h1 className="w-full text-center underline font-bold text-4xl text-secondary">
            {product.name}
          </h1>

          <h2 className="w-full text-center font-semibold text-2xl text-gray-600 mt-2">
            {product.altNames?.map((altName, index) => (
              <span key={index}>{" | " + altName}</span>
            ))}
          </h2>

          <h1 className="w-full text-center my-2 text-gray-600 font-semibold text-md">
            ID: {productId}
          </h1>

          <p className="w-full text-center my-2 text-gray-600 text-md">
            {product.description}
          </p>

          <div className="mt-4">
            {product.labelledPrice > product.price ? (
              <>
                <span className="text-3xl line-through mx-4 text-gray-400">
                  Rs. {product.labelledPrice.toFixed(2)}
                </span>
                <span className="text-3xl mx-4 text-gray-800">
                  Rs. {product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-3xl mx-4 text-gray-800">
                Rs. {product.price.toFixed(2)}
              </span>
            )}
             <div className="w-full flex items-center justify-center mt-4">
          <button className="w-[50%] bg-blue-800 mx-4 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 ">
            Buy Now
          </button>
          <button className="w-[50%] bg-yellow-800 mx-4 cursor-pointer text-white py-2 rounded-lg hover:bg-yellow-600 ">
            Add to Cart
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
