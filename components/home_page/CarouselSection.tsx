"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import GlassCard from "../GlassCard";


export default function CarouselSection() {
  const news = [
    { title: "News 1", description: "Details about news 1" },
    { title: "News 2", description: "Details about news 2" },
    { title: "News 3", description: "Details about news 3" },
  ];

  return (
    <section className="py-16 bg-blue-700 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Latest from the Hub</h2>
      <Swiper spaceBetween={30} slidesPerView={1} autoplay>
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <GlassCard title={item.title} description={item.description} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
