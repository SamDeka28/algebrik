import { useEffect, useState, ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";

interface PortalDropdownProps {
  anchorRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  autoWidth?: boolean;
  alignLeft?: boolean;
}

export default function PortalDropdown({ anchorRef, children, autoWidth = false, alignLeft = false }: PortalDropdownProps) {
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
        left: (autoWidth && alignLeft) ? coords.left : "50%",
        transform: (autoWidth && alignLeft) ? "none" : "translateX(-50%)",
        width: autoWidth ? "auto" : "100%",
        maxWidth: autoWidth ? "none" : "1260px",
        zIndex: 9999,
      }}
      className={`mt-2 rounded-[20px] shadow-lg backdrop-blur-3xl bg-black/50 text-white flex flex-col items-start ${autoWidth ? "" : "w-full max-w-[1260px] mx-auto"}`}
    >
      {children}
    </div>,
    document.body
  );
} 