import React from 'react';

type GradientShapeProps = {
  count: number;
  sizes: string[];
  isRectangle?: boolean; // Optional, determines if shapes are rectangles
  positions?: { top?: string; left?: string; right?: string; bottom?: string }[]; // Custom positions for each shape
  gradients?: string[]; // Array of gradient colors for each shape
  className?: string;
};

const GradientShapes: React.FC<GradientShapeProps> = ({
  count,
  sizes,
  isRectangle = false,
  positions = [],
  gradients = [], // Accept gradients as a prop
  className = '',
}) => {
  const shapes = [];

  // Generate custom positions or default positions
  for (let i = 0; i < count; i++) {
    const size = sizes[i % sizes.length]; // Cycle through sizes
    const position = positions[i] || {}; // Get the custom position or use the default
    const gradient = gradients[i] || 'from-[#44a043] to-[#7dbd5f]'; // Default gradient if none is provided
    const shapeClasses = isRectangle
      ? `w-[${size}] h-[${size}]` // If rectangle, use width and height
      : `w-[${size}] h-[${size}] rounded-full`; // If ellipse, use rounded full for circle/ellipse

    shapes.push(
      <div
        key={i}
        className={`absolute ${shapeClasses} ${className} opacity-60 blur-[80px]`}
        style={{
          background: `linear-gradient(to right, ${gradient})`, // Apply the gradient
          top: position.top || `${(i + 1) * 10}%`,
          left: position.left || `${(i + 1) * 10}%`,
          right: position.right,
          bottom: position.bottom,
        }}
      ></div>
    );
  }

  return <div className={`absolute inset-0 ${className} pointer-events-none`}>{shapes}</div>;
};

export default GradientShapes;
