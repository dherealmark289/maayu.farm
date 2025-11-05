"use client";

import { useState } from "react";
import PixelSign from "./PixelSign";
import TeamGrid from "./TeamGrid";
import MobileMenu from "./MobileMenu";

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

export default function TeamClient({ initialMembers }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <div className="wrap team-page-wrap">
        <MobileMenu items={items} onToggle={setMenuOpen} />
        <div className={`menus scale-3x desktop-menu ${menuOpen ? "open" : ""}`}>
          {items.map((it) => (
            <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
          ))}
        </div>
        <section className="team-section">
          <div className="team-intro">
            <div className="team-title-card">
              <h1 className="team-title">MEET THE TEAM</h1>
            </div>
            <p className="team-description">
              Get to know the amazing people who make DAO Home what it is.
            </p>
            <p className="team-description">
              Our diverse team brings passion, expertise, and dedication to everything we do.
            </p>
          </div>
          {!initialMembers || initialMembers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>No team members found.</p>
            </div>
          ) : (
            <TeamGrid members={initialMembers} />
          )}
        </section>
      </div>
    </main>
  );
}
