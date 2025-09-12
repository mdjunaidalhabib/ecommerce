"use client";

import BackToTopButton from "../../components/home/BackToTopButton";
import Footer from "../../components/home/footer";
import ImageSlider from "../../components/home/ImageSlider";
import HomeCategorySections from "../../components/home/HomeCategorySections";


export default function HomePage() {
  return (
    <section className="bg-teal-50 ">
      <div className="px-4 md:px-10 pb-14 pt-8 max-w-7xl mx-auto">
        <ImageSlider />
        <HomeCategorySections />


        <BackToTopButton />
        <Footer />
      </div>
    </section>
  );
}
