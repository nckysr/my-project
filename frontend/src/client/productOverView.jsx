import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/imageSlider";
import Loading from "../components/loading";
import { addToCart, getCart } from "../utils/cart";

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
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-6">
      {/* Left: Image Slider */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
        <div className="w-full max-w-md">
          <ImageSlider images={product?.images || []} />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
            {product.name}
          </h1>

          {product.altNames?.length > 0 && (
            <h2 className="text-center text-lg text-gray-600 font-medium mb-2">
              {product.altNames.map((altName, index) => (
                <span key={index} className="mx-1">
                  | {altName}
                </span>
              ))}
            </h2>
          )}

          <p className="text-sm text-center text-gray-400 mb-4">
            Product ID: {productId}
          </p>

          <p className="text-gray-700 text-base text-center mb-6">
            {product.description}
          </p>

          <div className="text-center mb-6">
            {product.labelledPrice > product.price ? (
              <>
                <span className="text-2xl text-gray-400 line-through mr-3">
                  Rs. {product.labelledPrice.toFixed(2)}
                </span>
                <span className="text-3xl text-green-600 font-semibold">
                  Rs. {product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-3xl text-gray-800 font-semibold">
                Rs. {product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <button className="w-1/2 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200">
              Buy Now
            </button>
            <button
              onClick={() => {
                addToCart(product, 1);
                toast.success("Added to cart!");
                console.log("Product added to cart:", getCart() );
              }}
              className="w-1/2 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
