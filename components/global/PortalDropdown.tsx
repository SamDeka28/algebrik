import { useEffect, useState, ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";

interface PortalDropdownProps {
  anchorRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  autoWidth?: boolean;
}

export default function PortalDropdown({ anchorRef, children, autoWidth = false }: PortalDropdownProps) {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        setCoords({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [anchorRef]);

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: coords.top + 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: autoWidth ? "auto" : "100%",
        maxWidth: autoWidth ? "1260px" : "auto",
        zIndex: 9999,
      }}
      className="mt-2 rounded-[20px] shadow-lg backdrop-blur-3xl bg-black/50 text-white flex flex-col items-start w-full max-w-[1260px] mx-auto"
    >
      {children}
    </div>,
    document.body
  );
} 