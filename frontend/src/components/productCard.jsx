import React from "react";

export function ProductCard(props) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-500 text-lg">
          ★
        </span>
      );
    }

    if (halfStar) {
      stars.push(
        <span key="half" className="text-yellow-400 text-lg">
          ☆
        </span>
      );
    }

    while (stars.length < totalStars) {
      stars.push(
        <span key={`empty-${stars.length}`} className="text-gray-400 text-lg">
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="w-[300px] h-[500px] bg-gray-200  shadow-lg border border-gray-300 rounded-xl overflow-hidden flex flex-col justify-between hover:scale-105 transition-transform duration-300">
      {/* Image */}
      <div className="h-[200px] w-full bg-gray-100 flex items-center justify-center">
        {props.images && props.images.length > 0 ? (
          <img
            src={props.images[0]}
            alt={props.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{props.name}</h2>{" "}
          <p className="text-sm text-gray-500 truncate">{props.altNames}</p>
          <p className="text-sm text-gray-500 mt-1 h-[48px] overflow-hidden">
            {props.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-3">
          {props.labelledPrice !== props.price ? (
            <div className="flex items-center gap-2">
              <p className="text-red-500 font-bold text-lg">
                Rs. {props.price.toLocaleString()}
              </p>
              <p className="text-gray-400 line-through text-sm">
                Rs. {props.labelledPrice.toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-700 font-semibold text-lg">
              Rs. {props.price.toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          {renderStars(props.rating)}
          <span className="ml-2 text-sm text-gray-600">({props.rating})</span>
        </div>

        {/* Stock & Button */}
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`text-sm font-medium ${
              props.isAvailable && props.stock > 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {props.isAvailable && props.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div className="p-4 flex justify-between gap-2">
          <button className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Buy Now
          </button>
          <button className="w-1/2 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {props.name}
        </h2>

        <p className="text-lg font-bold text-green-700">${props.price}</p>
      </div>
    </div>
  );
}
