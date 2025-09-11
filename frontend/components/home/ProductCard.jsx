"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { cart, setCart, wishlist, setWishlist } = useCart();

  const quantity = cart[product.id] || 0;
  const discount = (
    ((product.oldPrice - product.price) / product.oldPrice) *
    100
  ).toFixed(1);
  const isInWishlist = wishlist.includes(product.id);
  const totalPrice = product.price * quantity;

  const updateCart = (id, change) => {
    setCart((prev) => {
      const qty = (prev[id] || 0) + change;
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: qty };
    });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="relative bg-white shadow-md p-3 rounded-lg hover:shadow-lg transition flex flex-col"
    >
      {/* Discount badge */}
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
        -{discount}%
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition ${
          isInWishlist ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        <FaHeart className="w-4 h-4" />
      </button>

      {/* Image */}
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="rounded-lg mb-3 w-full h-40 sm:h-48 md:h-52 object-cover"
      />

      {/* Title */}
      <h4 className="font-semibold text-base sm:text-lg mb-1">
        {product.name}
      </h4>

      {/* Rating */}
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < product.rating ? "text-yellow-500 w-3" : "text-gray-300 w-3"
            }
          />
        ))}
      </div>

      {/* Price */}
      <div className="flex items-center space-x-2 mb-3">
        <p className="text-blue-600 font-bold text-sm sm:text-base">
          ৳{product.price}
        </p>
        <p className="text-gray-400 line-through text-xs sm:text-sm">
          ৳{product.oldPrice}
        </p>
      </div>

      {/* Cart actions */}
      {!quantity ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            updateCart(product.id, +1);
          }}
          className="mt-auto bg-blue-600 w-full text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 text-sm sm:text-base"
        >
          <FaShoppingCart /> Add
        </button>
      ) : (
        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm sm:text-base">Qty:</span>
            <div className="flex items-center space-x-1 sm:space-x-2 bg-gray-100 rounded-lg px-2 py-1 sm:px-3 sm:py-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateCart(product.id, -1);
                }}
                className="bg-red-500 text-white p-1 sm:p-2 rounded-lg hover:bg-red-600"
              >
                <FaMinus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <span className="text-sm sm:text-base font-bold">{quantity}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateCart(product.id, +1);
                }}
                className="bg-green-500 text-white p-1 sm:p-2 rounded-lg hover:bg-green-600"
              >
                <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
          <p className="text-center font-semibold text-gray-700 text-sm sm:text-base">
            Total: <span className="text-blue-600">৳{totalPrice}</span>
          </p>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
