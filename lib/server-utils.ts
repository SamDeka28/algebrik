import fs from "fs";
import path from "path";
import sizeOf from "image-size";

export function getEventImages() {
  const eventDir = path.join(process.cwd(), "public/Event");

  try {
    const files = fs.readdirSync(eventDir);
    return files.map((file) => {
      const filePath = path.join(eventDir, file);
      const dimensions = sizeOf(filePath);

      return {
        src: `/Event/${file}`,
        width: dimensions.width,
        height: dimensions.height,
      };
    });
  } catch (error) {
    console.error("Error reading Event folder:", error);
    return [];
  }
} 