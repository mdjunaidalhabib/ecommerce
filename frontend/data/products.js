// data/products.js

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 99,
    oldPrice: 149,
    image: "/photo/p3.jpg",
    rating: 4,
    category: "electronics",
    description:
      "In ducimus quod sed eum repellendus ea fugiat. Pariatur et illo at iure harum...",
    additionalInfo:
      "Warranty: 1 year | Connectivity: Bluetooth 5.0 | Battery: Up to 30 hours",
    reviews: [
      { user: "Rahim", rating: 5, comment: "খুবই ভালো প্রোডাক্ট!" },
      {
        user: "Karim",
        rating: 4,
        comment: "সাউন্ড কোয়ালিটি দারুণ, তবে ব্যাটারি আরও ভালো হতে পারত।",
      },
    ],
    // multiple images
    images: ["/photo/p1.jpg", "/photo/p2.jpg", "/photo/p3.jpg"],
  },
  {
    id: 2,
    name: "Product 2",
    price: 120,
    oldPrice: 200,
    image: "/photo/p4.jpg",
    rating: 5,
    category: "electronics",
    description: "Pariatur et illo at iure harum...",
    additionalInfo:
      "Warranty: 1 year | Connectivity: Bluetooth 5.0 | Battery: Up to 30 hours",
    reviews: [
      { user: "him", rating: 5, comment: "খুবই ভালো প্রোডাক্ট!" },
      {
        user: "rim",
        rating: 4,
        comment: "সাউন্ড কোয়ালিটি দারুণ, তবে ব্যাটারি আরও ভালো হতে পারত।",
      },
    ],
    // colors with different images
    colors: [
      {
        name: "Black",
        images: ["/photo/p1.jpg", "/photo/p2.jpg", "/photo/p3.jpg"],
      },
      {
        name: "Silver",
        images: ["/photo/p2.jpg", "/photo/p3.jpg", "/photo/p1.jpg"],
      },
      {
        name: "Rose Gold",
        images: ["/photo/p3.jpg", "/photo/p2.jpg", "/photo/p1.jpg"],
      },
    ],
  },
  {
    id: 3,
    name: "Product 3",
    price: 150,
    oldPrice: 180,
    image: "/photo/p1.jpg",
    rating: 3,
    category: "fashion",
    description: "repellendus ea fugiat. Pariatur et illo at iure harum...",
    additionalInfo:
      "Warranty: 1 year | Connectivity: Bluetooth 5.0 | Battery: Up to 30 hours",
    reviews: [
      { user: "Ra", rating: 5, comment: "খুবই ভালো প্রোডাক্ট!" },
      {
        user: "Ka",
        rating: 4,
        comment: "সাউন্ড কোয়ালিটি দারুণ, তবে ব্যাটারি আরও ভালো হতে পারত।",
      },
    ],
  },
  {
    id: 4,
    name: "Product 4",
    price: 200,
    oldPrice: 250,
    image: "/photo/p2.jpg",
    rating: 4,
    category: "fashion",
  },
  {
    id: 5,
    name: "Product 5",
    price: 99,
    oldPrice: 149,
    image: "/photo/p3.jpg",
    rating: 4,
    category: "home",
  },
  {
    id: 6,
    name: "Product 6",
    price: 120,
    oldPrice: 200,
    image: "/photo/p4.jpg",
    rating: 5,
    category: "home",
  },
  {
    id: 7,
    name: "Product 7",
    price: 150,
    oldPrice: 180,
    image: "/photo/p1.jpg",
    rating: 3,
    category: "sports",
  },
  {
    id: 8,
    name: "Product 8",
    price: 200,
    oldPrice: 250,
    image: "/photo/p2.jpg",
    rating: 4,
    category: "sports",
  },
];

export default products;
