// app/categories/[id]/page.jsx
import products from "../../../../data/products";
import categories from "../../../../data/categories";
import ProductCard from "../../../../components/home/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";

// স্ট্যাটিক জেনারেশনের জন্য (ইচ্ছা করলে বাদও দিতে পারো)
export async function generateStaticParams() {
  return categories.map((c) => ({ id: String(c.id) }));
}

function getCategoryById(id) {
  // id string হতে পারে—products.category এর সাথে মেলানো দরকার
  return categories.find((c) => String(c.id) === String(id));
}

export default async function CategoryPage({ params }) {
  const { id } = await params; // আপনার সেটআপে params await লাগছে
  const category = getCategoryById(id);
  if (!category) return notFound();

  // products.category == category.id মিলিয়ে ফিল্টার
  const items = products.filter(
    (p) => String(p.category) === String(category.id)
  );

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{category.name}</span>
      </nav>

      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">{category.name}</h1>
        <Link
          href="/products"
          className="text-blue-600 hover:underline text-sm sm:text-base"
        >
          All Products
        </Link>
      </div>

      {/* Products grid */}
      {items.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p>No products found in this category.</p>
        </div>
      )}
    </main>
  );
}
