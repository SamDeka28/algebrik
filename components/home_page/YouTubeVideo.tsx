"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  className?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ 
  videoId, 
  title = "YouTube Video",
  className = ""
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setIsVisible(true);
          setHasPlayed(true);
        } else if (!entry.isIntersecting && hasPlayed) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [hasPlayed]);

  return (
    <div ref={videoRef} className={`w-full max-w-7xl mx-auto px-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="relative w-full"
        style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?${isVisible ? 'autoplay=1&mute=1&loop=1&playlist=' + videoId : 'autoplay=0'}&controls=1&modestbranding=1&rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
          style={{
            transition: 'all 0.3s ease-in-out',
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          }}
        />
      </motion.div>
    </div>
  );
};

export default YouTubeVideo;
