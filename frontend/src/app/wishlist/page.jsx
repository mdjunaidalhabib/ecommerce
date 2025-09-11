"use client";
import React from "react";
import Image from "next/image";
import { FaHeart, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 99,
    oldPrice: 149,
    image: "/photo/p3.jpg",
    rating: 4,
  },
  {
    id: 2,
    name: "Product 2",
    price: 120,
    oldPrice: 200,
    image: "/photo/p4.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Product 3",
    price: 150,
    oldPrice: 180,
    image: "/photo/p1.jpg",
    rating: 3,
  },
  {
    id: 4,
    name: "Product 4",
    price: 200,
    oldPrice: 250,
    image: "/photo/p2.jpg",
    rating: 4,
  },
  {
    id: 5,
    name: "Product 5",
    price: 99,
    oldPrice: 149,
    image: "/photo/p3.jpg",
    rating: 4,
  },
  {
    id: 6,
    name: "Product 6",
    price: 120,
    oldPrice: 200,
    image: "/photo/p4.jpg",
    rating: 5,
  },
  {
    id: 7,
    name: "Product 7",
    price: 150,
    oldPrice: 180,
    image: "/photo/p1.jpg",
    rating: 3,
  },
  {
    id: 8,
    name: "Product 8",
    price: 200,
    oldPrice: 250,
    image: "/photo/p2.jpg",
    rating: 4,
  },
];

const WishlistPage = () => {
  const { cart, setCart, wishlist, setWishlist } = useCart();

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const handleAdd = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleIncrease = (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id) => {
    setCart((prev) => {
      if ((prev[id] || 0) > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      }
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0)
    return (
      <div>
        <p className="text-center mt-20">No products in wishlist!</p>
      </div>
    );

  return (
    <div>
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Wishlist</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistProducts.map((product) => {
            const quantity = cart[product.id] || 0;
            return (
              <div
                key={product.id}
                className="bg-white p-3 rounded-lg shadow-md flex flex-col"
              >
                <div className="relative mb-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                  >
                    <FaHeart />
                  </button>
                </div>
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-blue-600 font-bold">৳{product.price}</p>
                {!quantity ? (
                  <button
                    onClick={() => handleAdd(product.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg mt-auto flex items-center justify-center gap-1"
                  >
                    <FaShoppingCart /> Add
                  </button>
                ) : (
                  <div className="flex items-center justify-between mt-auto">
                    <button
                      onClick={() => handleDecrease(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                    >
                      <FaMinus />
                    </button>
                    <span className="font-bold">{quantity}</span>
                    <button
                      onClick={() => handleIncrease(product.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded-lg"
                    >
                      <FaPlus />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default WishlistPage;
