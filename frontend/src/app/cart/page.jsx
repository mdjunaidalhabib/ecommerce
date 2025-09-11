"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import products from "../../../data/products";
import { useRouter } from "next/navigation";
import { FaPlus, FaMinus, FaTrash, FaHeart } from "react-icons/fa";

export default function CartPage() {
  const router = useRouter();
  const { cart, setCart, wishlist, setWishlist } = useCart();

  const ids = Object.keys(cart).map(Number);
  const items = products.filter((p) => ids.includes(p.id));
  const grandTotal = items.reduce((sum, p) => sum + p.price * cart[p.id], 0);

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

  const removeFromCart = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((x) => x !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // ✅ Checkout হ্যান্ডলার (login চেক সহ)
  // ✅ Checkout হ্যান্ডলার (login চেক সহ)
  const handleCheckout = async () => {
    try {
      console.log("👉 Trying to checkout full cart");

      const res = await fetch("http://localhost:4000/auth/checkout", {
        credentials: "include",
      });

      if (res.status === 401) {
        const redirectUrl = encodeURIComponent(
          "http://localhost:3000/checkout"
        );
        console.log(
          "❌ Not logged in. Redirecting to Google login with redirect:",
          redirectUrl
        );

        window.location.href = `http://localhost:4000/auth/google?redirect=${redirectUrl}`;
        return;
      }

      console.log("✅ Logged in. Going to /checkout");
      router.push("/checkout");
    } catch (err) {
      console.error("🔥 Cart checkout error:", err);
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
        Your Cart
      </h1>

      {!items.length ? (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((p) => {
            const qty = cart[p.id];
            const total = p.price * qty;
            const discount =
              p.oldPrice &&
              (((p.oldPrice - p.price) / p.oldPrice) * 100).toFixed(1);

            const isInWishlist = wishlist.includes(p.id);

            return (
              <div
                key={p.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <Link
                  href={`/products/${p.id}`}
                  className="w-24 h-24 relative flex-shrink-0 block"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain rounded"
                  />
                </Link>

                <div className="flex-1">
                  <Link
                    href={`/products/${p.id}`}
                    className="font-semibold hover:underline"
                  >
                    {p.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-blue-600 font-bold">৳{p.price}</span>
                    {p.oldPrice && (
                      <span className="line-through text-gray-400 text-sm">
                        ৳{p.oldPrice}
                      </span>
                    )}
                    {discount && (
                      <span className="text-red-500 text-sm font-medium">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCart(p.id, -1)}
                    className="bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600"
                  >
                    <FaMinus />
                  </button>
                  <span className="font-bold">{qty}</span>
                  <button
                    onClick={() => updateCart(p.id, +1)}
                    className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(p.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded flex items-center gap-1 hover:bg-red-700"
                >
                  <FaTrash /> Remove
                </button>

                <button
                  onClick={() => toggleWishlist(p.id)}
                  className={`p-3 rounded-full shadow ${
                    isInWishlist
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <FaHeart />
                </button>

                <div className="font-semibold text-blue-600 ml-auto">
                  Total: ৳{total}
                </div>
              </div>
            );
          })}

          <div className="text-right font-bold text-lg mt-6">
            Grand Total: <span className="text-blue-600">৳{grandTotal}</span>
          </div>

          <div className="text-right mt-4">
            <button
              onClick={handleCheckout}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
