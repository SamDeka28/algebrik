import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StrapiAPI, getStrapiMediaUrl } from "@/lib/strapi";

interface NewsArticle {
  id: number;
  attributes: {
    title: string;
    description: string;
    source: string;
    author: string;
    image: any;
    link: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export default function Articles() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news: any = await StrapiAPI.find("news-articles", {
          populate: "*",
          sort: ["createdAt:desc"],
          pagination: { pageSize: 6 } // Limit to 6 articles for homepage
        });
        setNewsArticles(news);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.dataset.isDragging = "true";
      container.dataset.startX = event.pageX.toString();
      container.dataset.scrollLeft = container.scrollLeft.toString();
      container.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (container && container.dataset.isDragging === "true") {
      const dx = event.pageX - parseFloat(container.dataset.startX!);
      container.scrollLeft = parseFloat(container.dataset.scrollLeft!) - dx;
    }
  };

  const handleMouseUp = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.dataset.isDragging = "false";
      container.style.cursor = "grab";
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 1;
    const scrollInterval = setInterval(() => {
      if (container.dataset.isDragging === "true") return;
      container.scrollLeft += scrollSpeed;
      if (
        container.scrollLeft + container.offsetWidth >= container.scrollWidth
      ) {
        container.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div
      className="container mx-auto max-w-[1160px] md:h-[717px] py-[40px] px-6 rounded-none md:rounded-[36px] mt-10"
      style={{
        background:
          "radial-gradient(ellipse at right, var(--tw-gradient-stops))",
        backgroundColor: "#7EB2FF",
        backgroundImage: "radial-gradient(ellipse at right, #7EB2FF, #043071)",
      }}
    >
      <h2 className="text-center text-[28px] md:text-[32px] font-plus-jakarta font-bold mt-[10px] mb-[40px] text-white">
        Check out the latest from the Originations Hub
      </h2>
      <div
        ref={scrollContainerRef}
        className="flex gap-[20px] md:gap-[32px] py-4 pl-[0px] md:pl-[40px] overflow-x-scroll"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        style={{
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx global>{`
          ::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {loading ? (
          <div className="min-w-[360px] bg-slate-100 max-w-[360px] h-full md:h-[428px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col items-center justify-center">
            <p className="text-gray-600">Loading articles...</p>
          </div>
        ) : newsArticles.length === 0 ? (
          <div className="min-w-[360px] bg-slate-100 max-w-[360px] h-full md:h-[428px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col items-center justify-center">
            <p className="text-gray-600">No articles available</p>
          </div>
        ) : (
          newsArticles.map((article, index) => {
            const articleData = article.attributes || article;
            return (
              <div
                key={article.id || index}
                className="min-w-[360px] bg-slate-100 max-w-[360px] h-full md:h-[428px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col"
              >
                <div className="flex flex-col flex-grow">
                  <div className="h-[269px]">
                    <h6 className="text-start text-gray-400 tracking-widest text-[14px] font-bold font-plus-jakarta uppercase">
                      news
                    </h6>
                    <p className="font-bold mb-4 text-[20px] font-plus-jakarta">
                      {articleData.title}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-[30px] font-bold font-plus-jakarta text-black leading-[30px]">
                      {articleData.source || articleData.author}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 flex justify-center w-full bg-white text-center py-3 h-[54px] rounded-b-[20px]">
                  <Link
                    href={articleData.link}
                    className="text-[#1A69DC] font-plus-jakarta font-semibold"
                    target="_blank"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="flex justify-center my-[40px]">
        <Link href="/resource-center" target="_blank">
          <button className="bg-white rounded-[32px] text-[#1A69DC] px-16 font-plus-jakarta border-[#195BD7] py-3 font-bold">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
}