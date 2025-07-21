import React from "react";
import ReactDOM from "react-dom";

export default function PRNewswireModal({ open, onClose, url }: { open: boolean; onClose: () => void; url: string }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-20 bg-black/50  w-screen h-screen">
      <div className="bg-white shadow-2xl w-full h-full flex rounded-2xl flex-col relative overflow-hidden">
        <button
          className="absolute top-4 right-6 text-gray-600 hover:text-black text-4xl z-10"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <iframe
          src={url}
          title="PR Newswire"
          className="flex-1 w-full h-full"
          frameBorder={0}
        />
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : (null as any)
  );
} 