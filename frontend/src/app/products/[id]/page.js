import products from "../../../../data/products";
import categories from "../../../../data/categories";
import ProductDetailsClient from "../../../../components/home/ProductDetailsClient";
import { notFound } from "next/navigation";

// স্ট্যাটিক pre-render চাইলে ব্যবহার করতে পারো
export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

function getProductById(id) {
  const numId = Number(id);
  return products.find((p) => Number(p.id) === numId);
}

export default async function ProductPage({ params }) {
  const { id } = await params; // ✅ Next.js (App Router) async params
  const product = getProductById(id);

  if (!product) return notFound();

  const category = categories.find((c) => c.id === product.category);
  const related = products
    .filter(
      (p) =>
        p.category === product.category && Number(p.id) !== Number(product.id)
    )
    .slice(0, 8);

  return (
    <ProductDetailsClient
      product={product}
      category={category}
      related={related}
    />
  );
}
