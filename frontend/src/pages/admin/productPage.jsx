import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProductPage() {
  const [allProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + `/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(() => {
        toast.success(response.data.message);

        setLoading(true);
      })
      .catch((error) => {
        console.error(response.data.message);
      });
  }

  return (
    <div className="w-full h-full bg-gray-300 max-h-full overflow-y-scroll ">
      <Link
        to="/admin/add-products"
        className="fixed bottom-4 right-4 bg-green-700 text-white font-bold px-4 py-2 rounded-md shadow-md hover:bg-blue-800 transition-colors"
      >
        + Add Products
      </Link>
      {loading ? (
        <p className="text-center text-blue-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <table className="w-full text-center border border-gray-400 text-sm">
          <thead>
            <tr className="bg-amber-200">
              <th className="border border-gray-400">S.No</th>
              <th className="border border-gray-400">Product ID</th>
              <th className="border border-gray-400">Name</th>
              <th className="border border-gray-400">Price</th>
              <th className="border border-gray-400">Labelled Price</th>
              <th className="border border-gray-400">Stock</th>
              <th className="border border-gray-400">Image</th>
              <th className="border border-gray-400">Available</th>
              <th className="border border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-gray-500 py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              allProducts.map((product, index) => (
                <tr
                  key={product.productId}
                  className="bg-white hover:bg-gray-100"
                >
                  <td className="border border-gray-300">{index + 1}</td>
                  <td className="border border-gray-300">
                    {product.productId}
                  </td>
                  <td className="border border-gray-300">{product.name}</td>
                  <td className="border border-gray-300">
                    Rs. {product.price}
                  </td>
                  <td className="border border-gray-300">
                    Rs. {product.labelledPrice}
                  </td>
                  <td className="border border-gray-300">{product.stock}</td>

                  <td className="border border-gray-300">
                    <img
                      src={product.images[0]}
                      alt="Product"
                      className="w-[50px] h-[50px] object-cover rounded-md mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300">
                    {product.isAvailable ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300">
                    <div className="flex justify-center items-center w-full gap-2">
                      <FaTrash
                        onClick={() => deleteProduct(product.productId)}
                        className="text-red-600 text-[20px] mx-2 cursor-pointer"
                      />
                      <FaEdit
                        onClick={() =>
                          navigate(`/admin/edit-products/`, {
                            state: product,
                          })
                        }
                        className="text-blue-600 text-[20px] mx-2 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
