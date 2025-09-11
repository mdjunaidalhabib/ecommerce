"use client";
import "./globals.css";
import { CartProvider } from "../../context/CartContext";
import Navbar from "../../components/home/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
