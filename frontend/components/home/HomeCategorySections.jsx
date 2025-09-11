"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import products from "../../data/products"; // <-- adjust path as needed
import categories from "../../data/categories"; // <-- adjust path as needed
import ProductCard from "./ProductCard"; // <-- adjust path as needed

// Utility: group products by category id
const groupByCategory = (all, catId) => all.filter((p) => p.category === catId);

// CategoryRow: a reusable row that shows a category title + a multi-card slider underneath
const CategoryRow = ({ category, items, autoPlayMs = 3000 }) => {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(2); // mobile default

  // Decide slides per view from viewport width
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) return 2; // mobile
      if (w < 1024) return 3; // tablet
      return 4; // desktop
    };
    const apply = () => setSlidesPerView(calc());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  // Build an extended list for looping (duplicate enough items so we can autoplay infinitely)
  const extended = useMemo(() => {
    if (!items || items.length === 0) return [];
    const minLen = items.length + slidesPerView * 2; // buffer
    const out = [];
    let i = 0;
    while (out.length < minLen) {
      out.push(items[i % items.length]);
      i++;
    }
    return out;
  }, [items, slidesPerView]);

  // Autoplay (always forward)
  useEffect(() => {
    if (!extended.length || !autoPlayMs) return;
    const id = setInterval(() => setIndex((i) => i + 1), autoPlayMs);
    return () => clearInterval(id);
  }, [extended.length, autoPlayMs]);

  // When index grows too large, snap it back within a safe window to avoid huge numbers
  useEffect(() => {
    if (!extended.length) return;
    const maxSafe = items.length + slidesPerView;
    if (index > maxSafe) {
      const normalized = ((index % items.length) + items.length) % items.length;
      setEnableTransition(false);
      setIndex(normalized);
      requestAnimationFrame(() => setEnableTransition(true));
    }
  }, [index, extended.length, items.length, slidesPerView]);

  // Pointer swipe (mobile)
  const startXRef = useRef(0);
  const draggingRef = useRef(false);
  const deltaXRef = useRef(0);

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    startXRef.current = e.clientX;
    deltaXRef.current = 0;
    setEnableTransition(false);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    deltaXRef.current = e.clientX - startXRef.current;
    if (e.pointerType !== "mouse") e.preventDefault();
  };
  const onPointerUp = () => {
    if (!draggingRef.current) return;
    const dx = deltaXRef.current;
    draggingRef.current = false;
    setEnableTransition(true);

    const el = trackRef.current;
    const width = el ? el.clientWidth : 1;
    const threshold = (width / slidesPerView) * 0.25;

    if (Math.abs(dx) >= threshold) {
      if (dx < 0) setIndex((i) => i + 1);
      else setIndex((i) => Math.max(0, i - 1));
    }
    deltaXRef.current = 0;
  };

  const basePercent = -(index * (100 / slidesPerView));
  const dragPercent = () => {
    if (!draggingRef.current) return 0;
    const el = trackRef.current;
    const width = el ? el.clientWidth : 1;
    return (deltaXRef.current / width) * 100;
  };
  const transform = `translateX(calc(${basePercent}% + ${dragPercent()}%))`;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">{category.name}</h2>
        <Link
          href={`/categories/${category.id}`}
          className="text-blue-600 hover:underline text-sm sm:text-base"
        >
          View all
        </Link>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-full select-none touch-pan-y"
          style={{
            transform,
            transition: enableTransition ? "transform 450ms ease" : "none",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {extended.map((prod, i) => (
            <div
              key={`${prod.id}-${i}`}
              className="shrink-0 px-2"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Custom autoplay speed per category
const speedByCategory = {
  electronics: 2500,
  fashion: 3200,
  home: 4000,
  // add more if needed
};

export default function HomeCategorySections() {
  return (
    <div className="space-y-4">
      {categories.map((cat) => {
        const items = groupByCategory(products, cat.id);
        if (!items.length) return null;
        return (
          <CategoryRow
            key={cat.id}
            category={cat}
            items={items}
            autoPlayMs={speedByCategory[cat.id] ?? 3000}
          />
        );
      })}
    </div>
  );
}
