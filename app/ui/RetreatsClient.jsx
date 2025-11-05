"use client";

import { useState, useRef } from "react";
import PixelSign from "./PixelSign";
import MobileMenu from "./MobileMenu";
import RetreatCards from "./RetreatCards";

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

export default function RetreatsClient({ initialWorkshops }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const contactRef = useRef(null);
  const showContact = () => {
    if (contactRef.current && typeof contactRef.current.scrollIntoView === 'function') {
      contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main>
      <div className="wrap retreats-page-wrap">
        <MobileMenu items={items} onToggle={setMenuOpen} />
        <div className={`menus scale-3x desktop-menu ${menuOpen ? "open" : ""}`}>
          {items.map((it) => (
            <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
          ))}
        </div>
        <section className="retreats-section">
          <div className="retreats-intro">
            <div className="retreats-title-card">
              <h1 className="retreats-title">JOIN OUR RETREATS</h1>
            </div>
            <p className="retreats-description">
              Experience life at DAO Home through our immersive retreat programs.
            </p>
            <p className="retreats-description">
              Connect with nature, learn new skills, and be part of our sustainable community.
            </p>
          </div>
          
          <RetreatCards initialWorkshops={initialWorkshops} onApplyNow={showContact} />

          {/* Contact Cards */}
          <div className="retreat-contact-cards" ref={contactRef}>
            <div className="retreat-contact-card">
              <div className="contact-image-wrap">
                <img src="/mark.JPG" alt="Mark" className="contact-image" />
              </div>
              <div className="contact-name">Mark</div>
              <div className="contact-title">Founder</div>
              <div className="contact-role">Visionary and Storytelling</div>
              <a href="tel:+66924345960" className="contact-call-btn">
                <span className="call-label">Call now</span>
                <span className="call-number">: +66 92 434 5960</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
