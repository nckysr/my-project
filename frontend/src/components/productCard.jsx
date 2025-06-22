import React from "react";
import { Link } from "react-router-dom";

export function ProductCard(props) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400 text-sm">★</span>
      );
    }

    if (halfStar) {
      stars.push(
        <span key="half" className="text-yellow-300 text-sm">☆</span>
      );
    }

    while (stars.length < totalStars) {
      stars.push(
        <span key={`empty-${stars.length}`} className="text-gray-300 text-sm">☆</span>
      );
    }

    return stars;
  };

  return (
    <Link
      to={`/overview/${props.productId}`}
      className="w-full max-w-xs bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col"
    >
      {/* Image */}
      <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        {props.images?.length > 0 ? (
          <img
            src={props.images[0]}
            alt={props.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image Available</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{props.name}</h3>
          <p className="text-sm text-gray-500 truncate">{props.altNames}</p>
        </div>

        <p className="text-sm text-gray-600 h-12 overflow-hidden mb-2">
          {props.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          {props.labelledPrice !== props.price ? (
            <>
              <span className="text-lg font-bold text-blue-600">
                Rs. {props.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 line-through">
                Rs. {props.labelledPrice.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-blue-600">
              Rs. {props.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {renderStars(props.rating)}
          <span className="text-sm text-gray-600">({props.rating})</span>
        </div>

        {/* Stock Info */}
        <span
          className={`text-sm font-medium ${
            props.isAvailable && props.stock > 0
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {props.isAvailable && props.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button className="flex-1 bg-blue-600 text-white py-2 text-sm rounded-xl hover:bg-blue-700 transition">
            Buy Now
          </button>
          <button className="flex-1 bg-yellow-500 text-white py-2 text-sm rounded-xl hover:bg-yellow-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
