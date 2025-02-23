import fs from "fs";
import path from "path";

export function getEventImages() {
  const eventDir = path.join(process.cwd(), "public/Event");

  try {
    const files = fs.readdirSync(eventDir);
    return files.map((file) =>({src: `/Event/${file}`})); // Returns public URLs
  } catch (error) {
    console.error("Error reading Event folder:", error);
    return [];
  }
}
