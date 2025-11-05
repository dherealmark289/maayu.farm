"use client";

import { useState } from "react";
import PixelSign from "./ui/PixelSign";
import HomeCards from "./ui/HomeCards";
import MobileMenu from "./ui/MobileMenu";
const items = [
  { label: "home", href: "/", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/House/3D/house_3d.png" },
  { label: "vision", href: "/vision", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Herb/3D/herb_3d.png" },
  { label: "retreats", href: "/retreats", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Camping/3D/camping_3d.png" },
  { label: "experiences", href: "/experiences", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Star/3D/star_3d.png" },
  { label: "volunteers", href: "/volunteers", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Handshake/3D/handshake_3d.png" },
  { label: "accommodation", href: "/accommodation", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Hotel/3D/hotel_3d.png" },
  { label: "animals", href: "/animals", iconUrl: "/animals.png" },
  { label: "team", href: "/team", iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f465.svg" },
  { label: "blog", href: "/blog", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Notebook/3D/notebook_3d.png" },
  { label: "gallery", href: "/gallery", iconUrl: "/gallery.png" }
];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <main>
      <div className="home-page-wrap">
        <div className="home-section">
          <div className="home-top-section">
            <div className="home-hero-content">
              <h1 className="home-title">MAAYU.FARM</h1>
              <p className="home-tagline">A REAL-LIFE STARDEW VALLEY</p>
              <p className="home-description">
                Where community, creativity, and nature meet in Chiang Dao, Thailand —
                <a href="/volunteers" style={{ color: '#fff', textDecoration: 'underline', marginLeft: 4 }}>Volunteer</a>,
                <a href="/experiences" style={{ color: '#fff', textDecoration: 'underline', marginLeft: 6 }}>Experience</a>, and
                <a href="/accommodation" style={{ color: '#fff', textDecoration: 'underline', marginLeft: 6 }}>Stay</a> with us.
              </p>
              <div className="home-buttons">
                <a href="/retreats" className="home-button">Join a Retreat</a>
                <a href="/vision" className="home-button">See a Farm Vision</a>
              </div>
            </div>
          </div>
          <div className="wrap">
            <MobileMenu items={items} onToggle={setMenuOpen} />
            <div className={`menus scale-3x desktop-menu ${menuOpen ? "open" : ""}`}>
              {items.map((it) => (
                <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
              ))}
            </div>
            {/* Home highlight cards */}
            <HomeCards />
          </div>
        </div>
      </div>
    </main>
  );
}


