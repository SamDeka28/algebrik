"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface ParticlesProps {
  count?: number;
  color?: string;
  className?: string;
  spread?: "full" | "center" | "bottom";
}

export const Particles = ({ 
  count = 30, 
  color = "primary",
  className = "",
  spread = "full"
}: ParticlesProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const getPosition = () => {
        switch (spread) {
          case "center":
            return {
              x: 30 + Math.random() * 40,
              y: 30 + Math.random() * 40,
            };
          case "bottom":
            return {
              x: Math.random() * 100,
              y: 50 + Math.random() * 50,
            };
          default:
            return {
              x: Math.random() * 100,
              y: Math.random() * 100,
            };
        }
      };
      
      const pos = getPosition();
      
      return {
        id: i,
        x: pos.x,
        y: pos.y,
        size: 2 + Math.random() * 4,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      };
    });
  }, [count, spread]);

  const colorClass = color === "primary" 
    ? "bg-primary" 
    : color === "purple" 
      ? "bg-[hsl(280_80%_65%)]" 
      : color === "teal"
        ? "bg-[hsl(175_85%_50%)]"
        : color === "blue"
          ? "bg-[hsl(210_100%_60%)]"
          : color === "coral"
            ? "bg-[hsl(15_90%_55%)]"
            : "bg-primary";

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${colorClass}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.6, 0],
            scale: [0, 1, 0.8, 1, 0],
            y: [0, -30, -20, -40, -60],
            x: [0, 10, -5, 15, 5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

interface ConfettiBurstProps {
  trigger: boolean;
  colors?: string[];
}

export const ConfettiBurst = ({ trigger, colors = ["#F5A623", "#8B5CF6", "#10B981", "#F43F5E", "#3B82F6"] }: ConfettiBurstProps) => {
  const confetti = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: 45 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      delay: Math.random() * 0.3,
      direction: -1 + Math.random() * 2,
      size: 4 + Math.random() * 8,
    }));
  }, [colors]);

  if (!trigger) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: "50%",
            width: piece.size,
            height: piece.size * 0.6,
            backgroundColor: piece.color,
            borderRadius: 2,
          }}
          initial={{ 
            opacity: 1, 
            y: 0, 
            x: 0,
            rotate: piece.rotation 
          }}
          animate={{
            opacity: [1, 1, 0],
            y: [0, -200, 400],
            x: [0, piece.direction * 150, piece.direction * 200],
            rotate: [piece.rotation, piece.rotation + 720],
          }}
          transition={{
            duration: 2.5,
            delay: piece.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}
    </div>
  );
};

