"use client";

import { useState } from "react";
import PixelSign from "./PixelSign";

export default function MobileMenu({ items, onToggle }) {
  const [open, setOpen] = useState(false);
  
  const handleToggle = () => {
    const newOpen = !open;
    setOpen(newOpen);
    if (onToggle) onToggle(newOpen);
  };

  return (
    <>
      <button
        type="button"
        className="hamburger"
        aria-label="Menu"
        aria-expanded={open ? "true" : "false"}
        onClick={handleToggle}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`mobile-menu ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="mobile-menu-inner">
          {items.map((it) => (
            <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
          ))}
        </div>
      </div>
    </>
  );
}


