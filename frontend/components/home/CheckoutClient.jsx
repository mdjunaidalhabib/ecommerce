"use client";
import { apiFetch } from "../../utils/api";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import products from "../../data/products";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const { cart, setCart } = useCart();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");
  const qty = Number(searchParams.get("qty")) || 1;

  const cartItems = useMemo(() => {
    if (productId) {
      const p = products.find((x) => x.id == productId);
      if (!p) return [];
      return [{ productId, name: p.name, price: p.price, qty, image: p.image }];
    }

    return Object.keys(cart).map((id) => {
      const p = products.find((x) => x.id == id);
      return {
        productId: id,
        name: p.name,
        price: p.price,
        qty: cart[id],
        image: p.image,
      };
    });
  }, [cart, productId, qty]);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

async function placeOrder() {
  console.log("👉 Placing order with items:", cartItems);

  const res = await apiFetch("/api/orders", {
    method: "POST",
    body: JSON.stringify({ items: cartItems, total }),
  });

  if (res.status === 401) {
    const redirectUrl = encodeURIComponent(window.location.href);
    console.log(
      "❌ Not logged in. Redirecting to Google login with redirect:",
      redirectUrl
    );

    window.location.href = `http://localhost:4000/auth/google?redirect=${redirectUrl}`;
    return;
  }

  if (res.ok) {
    console.log("✅ Order placed successfully");
    if (!productId) setCart({});
    window.location.href = "/orders";
  } else {
    console.error("🔥 Order failed", res);
  }
}

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Checkout</h1>
      {!cartItems.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((it) => (
            <div key={it.productId}>
              {it.name} × {it.qty}
            </div>
          ))}
          <p>Total: ৳{total}</p>
          <button
            onClick={placeOrder}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
