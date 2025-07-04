import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUploadPage";
import axios from "axios";

export default function EditProductPage() {
  const location = useLocation();
  console.log(location);
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice );
  const [price, setPrice] = useState(location.state.price );
  const [stock, setStock] = useState(location.state.stock);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function UpdateProduct() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    

    try {
      setLoading(true);

      let imageUrls = [];
       if (images.length > 0) {
        const uploadPromises = Array.from(images).map((img) => mediaUpload(img));
        imageUrls = await Promise.all(uploadPromises);
      }else{
        imageUrls = location.state.images
      }
     

      const altNamesArray = altNames.split(",").map((name) => name.trim());

      const product = {
        productId,
        name,
        altNames: altNamesArray,
        description,
        images: imageUrls,
        labelledPrice: Number(labelledPrice),
        price: Number(price),
        stock: Number(stock),
      };

     await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/`+ productId,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-[50%] px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500";
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center underline">
        Update Product
      </h2>
      <input
        type="text"
        disabled
        name="productId"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        required
        className={inputClass}
      />
      <input
        type="text"
        placeholder="Name"
        className={inputClass}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Alt Names (comma-separated)"
        className={inputClass}
        value={altNames}
        onChange={(e) => setAltNames(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        multiple
        className={inputClass}
        onChange={(e) => setImages(Array.from(e.target.files))}
      />
      <input
        type="number"
        placeholder="Labelled Price"
        className={inputClass}
        value={labelledPrice}
        onChange={(e) => setLabelledPrice(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Price"
        className={inputClass}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Stock"
        className={inputClass}
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Description"
        className={inputClass}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-center items-center gap-4 mt-4">
        <Link
          to="/admin/products"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Cancel
        </Link>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-60"
          onClick={UpdateProduct}
          disabled={loading}
        >
          {loading ? "Editing..." : "Edit Product"}
        </button>
      </div>
    </div>
  );
}
