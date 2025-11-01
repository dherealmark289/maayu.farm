"use client";

import { useState } from "react";
import PixelSign from "./PixelSign";
import GalleryGrid from "./GalleryGrid";
import MobileMenu from "./MobileMenu";

const items = [
  { label: "home", href: "/", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/House/3D/house_3d.png" },
  { label: "vision", href: "/vision", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Herb/3D/herb_3d.png" },
  { label: "retreats", href: "/retreats", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Camping/3D/camping_3d.png" },
  { label: "experiences", href: "/experiences", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Star/3D/star_3d.png" },
  { label: "volunteers", href: "/volunteers", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Handshake/3D/handshake_3d.png" },
  { label: "accommodation", href: "/accommodation", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Hotel/3D/hotel_3d.png" },
  { label: "animals", href: "/animals", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Paw%20Prints/3D/paw_prints_3d.png" },
  { label: "team", href: "/team", iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f465.svg" },
  { label: "blog", href: "/blog", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Notebook/3D/notebook_3d.png" },
  { label: "gallery", href: "/gallery", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Framed%20Picture/3D/framed_picture_3d.png" }
];

export default function GalleryClient({ initialAlbums }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <div className="wrap gallery-page-wrap">
        <MobileMenu items={items} onToggle={setMenuOpen} />
        <div className={`menus scale-3x desktop-menu ${menuOpen ? "open" : ""}`}>
          {items.map((it) => (
            <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
          ))}
        </div>
        <section className="gallery-section">
          <div className="gallery-intro">
            <div className="gallery-title-card">
              <h1 className="gallery-title">OUR GALLERY</h1>
            </div>
            <p className="gallery-description">
              Browse through our collection of moments, memories, and milestones.
            </p>
            <p className="gallery-description">
              Every photo tells a story of life at DAO Home.
            </p>
          </div>
          {!initialAlbums || initialAlbums.length === 0 ? (
            <div className="team-main-card">
              <h2 className="team-main-title">Albums</h2>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No gallery albums available at the moment.</p>
              </div>
            </div>
          ) : (
            <GalleryGrid albums={initialAlbums} />
          )}
        </section>
      </div>
    </main>
  );
}
