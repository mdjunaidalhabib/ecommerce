// app/categories/page.jsx
import categories from "../../../data/categories";
import Link from "next/link";
import Image from "next/image";

export default function ShopByCategoryPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Shop by Category</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
        Shop by Category
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="group block bg-white shadow rounded-xl overflow-hidden hover:shadow-md transition"
          >
            <div className="relative w-full h-32 sm:h-40 bg-gray-100">
              <Image
                src={cat.image || "/photo/default-category.jpg"}
                alt={cat.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3 text-center">
              <h3 className="text-base sm:text-lg font-medium group-hover:text-blue-600">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
