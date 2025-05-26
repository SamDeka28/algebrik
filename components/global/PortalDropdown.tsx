import { useEffect, useState, ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";

interface PortalDropdownProps {
  anchorRef: RefObject<HTMLDivElement>;
  children: ReactNode;
}

export default function PortalDropdown({ anchorRef, children }: PortalDropdownProps) {
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
        top: coords.top,
        left: coords.left,
        width: "303px",
        zIndex: 9999,
      }}
      className="mt-2 p-[16px] rounded-[20px] shadow-lg backdrop-blur-3xl bg-black/50 text-white flex flex-col items-start"
    >
      {children}
    </div>,
    document.body
  );
} 