"use client";

import { useState, useRef } from "react";
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

const defaultCategories = ["All", "Wellness", "Adventure", "Recovery", "Farm Life", "Craft & Build"];

export default function ExperiencesClient({ initialExperiences, initialCategories }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef(null);

  // Extract unique categories from experiences if not provided
  const uniqueCategories = initialCategories || (initialExperiences && initialExperiences.length > 0
    ? ["All", ...new Set(initialExperiences.map(exp => exp.category).filter(Boolean))]
    : defaultCategories);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const filteredExperiences = activeCategory === "All" 
    ? initialExperiences 
    : initialExperiences.filter(exp => exp.category === activeCategory);


  return (
    <main>
      <div className="wrap experiences-page-wrap">
        <MobileMenu items={items} onToggle={setMenuOpen} />
        <div className={`menus scale-3x desktop-menu ${menuOpen ? "open" : ""}`}>
          {items.map((it) => (
            <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
          ))}
        </div>
        <section className="experiences-section">
          <div className="experiences-intro">
            <div className="experiences-title-wrapper">
              <div className="experiences-title-decoration experiences-title-decoration-left">
                🌸🌿🌸🌿
              </div>
              <div className="experiences-title-card">
                <h1 className="experiences-title">EXPERIENCES</h1>
              </div>
              <div className="experiences-title-decoration experiences-title-decoration-right">
                🌿🌸🌿🌸
              </div>
            </div>
          </div>

          {/* Category Tags */}
          {uniqueCategories.length > 0 && (
            <div className="experiences-categories">
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  className={`experiences-category-tag ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Experience Cards - Horizontal Scrollable */}
          {initialExperiences && initialExperiences.length > 0 && (
            <div className="experiences-cards-container">
              <div className="experiences-cards-scroll" ref={scrollContainerRef}>
                {filteredExperiences.length === 0 ? (
                  <div className="text-center py-12 w-full">
                    <p className="text-gray-600 dark:text-gray-400">No experiences found for this category.</p>
                  </div>
                ) : (
                  filteredExperiences.map((experience) => (
                    <div key={experience.id} className="experience-card">
                      {experience.badge && (
                        <div className="experience-card-badge">{experience.badge}</div>
                      )}
                      <div className="experience-card-header">
                        <h3 className="experience-card-title">{experience.title}</h3>
                        {experience.subtitle && (
                          <p className="experience-card-subtitle">{experience.subtitle}</p>
                        )}
                      </div>
                      {/* Display first image from imageUrls if available, otherwise use image field or emoji */}
                      <div className="experience-card-image">
                        {experience.imageUrls && experience.imageUrls.length > 0 ? (
                          <img 
                            src={experience.imageUrls[0]} 
                            alt={experience.title}
                            className="experience-card-image-img"
                          />
                        ) : experience.image ? (
                          <span className="experience-card-image-icon">{experience.image}</span>
                        ) : null}
                      </div>
                      <div className="experience-card-price">
                        {experience.priceTHB === 0 || !experience.priceTHB ? "Free" : `THB ${experience.priceTHB}`}
                      </div>
                      {experience.duration && (
                        <div className="experience-card-duration">
                          Duration: {experience.duration}
                        </div>
                      )}
                      {experience.schedule && (
                        <div className="experience-card-schedule">
                          {experience.schedule}
                        </div>
                      )}
                      {experience.includes && experience.includes.length > 0 && (
                        <div className="experience-card-included">
                          <div className="experience-card-included-header">
                            <span className="experience-card-included-icon">🌱</span>
                            <span>What&apos;s included</span>
                          </div>
                          <ul className="experience-card-included-list">
                            {experience.includes.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {experience.bring && experience.bring.length > 0 && (
                        <div className="experience-card-bring">
                          <div className="experience-card-included-header">
                            <span className="experience-card-included-icon">👜</span>
                            <span>What to bring</span>
                          </div>
                          <ul className="experience-card-included-list">
                            {experience.bring.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button 
                        className="experience-card-book-btn"
                        onClick={() => experience.link && (window.location.href = experience.link)}
                      >
                        Book Now
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Call to Action Banner */}
          <div className="experiences-cta-banner">
            <p className="experiences-cta-text">
              Join us at Maayu Farm and try one of our unique experiences designed to connect with nature.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
