"use client";

import type { MouseEvent, ReactNode } from "react";

// Card whose border and surface glow follow the cursor.
export default function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className={`spot ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  );
}
