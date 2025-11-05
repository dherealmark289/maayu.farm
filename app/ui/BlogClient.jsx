"use client";

import { useState } from "react";
import PixelSign from "./PixelSign";
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

export default function BlogClient({ initialPosts }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main>
      <div className="wrap blog-page-wrap">
        <MobileMenu items={items} onToggle={setMenuOpen} />
        <div className={`menus scale-3x desktop-menu ${menuOpen ? "open" : ""}`}>
          {items.map((it) => (
            <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
          ))}
        </div>
        <section className="blog-section">
          <div className="blog-intro">
            <div className="blog-title-card">
              <h1 className="blog-title">OUR STORIES</h1>
            </div>
            <p className="blog-description">
              Explore our journey through stories, experiences, and insights from life at DAO Home.
            </p>
            <p className="blog-description">
              From daily adventures to deeper reflections on sustainable living.
            </p>
          </div>
          {!initialPosts || initialPosts.length === 0 ? (
            <div className="team-main-card">
              <h2 className="team-main-title">Blog Posts</h2>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No blog posts available at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="team-main-card">
              <h2 className="team-main-title">Blog Posts</h2>
              <div className="team-grid">
                {initialPosts.map((post) => (
                  <button 
                    key={post.id} 
                    type="button"
                    className="member-card"
                    onClick={() => window.location.href = `/blog/${post.slug}`}
                  >
                    {post.featuredImage && (
                      <div className="member-media">
                        <img alt={post.title} src={post.featuredImage} />
                      </div>
                    )}
                    <div className="member-name">{post.title}</div>
                    {post.category && (
                      <div className="member-role">{post.category}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
