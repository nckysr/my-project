import { useState } from "react";
import { addToCart, getCart, removeFromCart } from "../utils/cart";
import { BiMinus, BiTrash, BiPlus } from "react-icons/bi";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  const updateQuantity = (productId, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        const newQty = item.qty + delta;
        if (newQty < 1) return item;
        const updatedItem = { ...item, qty: newQty };
        addToCart(updatedItem); // update in storage
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  return (
    <div className="w-full h-full flex bg-amber-300 flex-col items-center pt-4">
      {cart.map((item) => (
        <div
          key={item.productId}
          className="w-[600px] h-[100px] bg-red-50 rounded-tl-3xl rounded-bl-3xl flex flex-row shadow-2xl mb-4"
        >
          <img
            className="w-[100px] h-[100px] object-cover rounded-3xl"
            src={item.images}
            alt=""
          />
          <div className="w-[250px] h-full flex flex-col justify-center items-center">
            <h1>{item.name}</h1>
            <h1>{item.productId}</h1>
            {item.labelledPrice > item.price ? (
              <div>
                <span className="text-md text-gray-400 line-through mr-3">
                  Rs. {item.labelledPrice.toFixed(2)}
                </span>
                <span className="text-md text-green-600 font-semibold">
                  Rs. {item.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-md text-gray-800 font-semibold">
                Rs. {item.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="w-[100px] h-[100px] flex justify-center items-center gap-2">
            <button
              onClick={() => updateQuantity(item.productId, -1)}
              className="w-[40px] h-[40px] flex justify-center font-bold items-center bg-green-400 p-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              <BiMinus />
            </button>

            <span className="mx-2 text-xl font-bold">{item.qty}</span>

            <button
              onClick={() => updateQuantity(item.productId, 1)}
              className="w-[40px] h-[40px] flex justify-center font-bold items-center bg-green-400 p-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200 cursor-pointer"
            >
              <BiPlus />
            </button>
          </div>
          <div className="w-[100px] h-[100px] flex flex-col justify-center items-end pr-2 gap-2">
            <h1 className="text-md font-semibold">
              Total Rs. {(item.qty * item.price).toFixed(2)}
            </h1>
          </div>{" "}
          <div><button
            onClick={() => handleRemove(item.productId)}
            className="text-red-600 hover:text-red-800"
            title="Remove Item"
          >
            <BiTrash size={20} />
          </button></div>
        </div>
      ))}
    </div>
  );
}
