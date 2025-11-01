"use client";

import { useState } from "react";
import PixelSign from "./PixelSign";
import AnimalGrid from "./AnimalGrid";
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

export default function AnimalsClient({ initialAnimals }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <div className="wrap animals-page-wrap">
        <MobileMenu items={items} onToggle={setMenuOpen} />
        <div className={`menus scale-3x desktop-menu ${menuOpen ? "open" : ""}`}>
          {items.map((it) => (
            <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
          ))}
        </div>
        <section className="animals-section">
          <div className="animals-intro">
            <div className="animals-title-card">
              <h1 className="animals-title">MEET OUR ANIMALS</h1>
            </div>
            <p className="animals-description">
              Discover the wonderful creatures that call DAO Home their sanctuary.
            </p>
            <p className="animals-description">
              Each animal has a unique story and plays a vital role in our ecosystem.
            </p>
          </div>
          {!initialAnimals || initialAnimals.length === 0 ? (
            <div className="team-main-card">
              <h2 className="team-main-title">Animals</h2>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No animals available at the moment.</p>
              </div>
            </div>
          ) : (
            <AnimalGrid animals={initialAnimals} />
          )}
        </section>
      </div>
    </main>
  );
}
