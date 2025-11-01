"use client";

import { useState, useEffect } from 'react';

export default function RetreatCards({ initialWorkshops = [] }) {
  const [workshops] = useState(initialWorkshops);
  const [expandedImages, setExpandedImages] = useState({}); // Track which workshops show all images
  const [lightboxImage, setLightboxImage] = useState(null); // { workshopId, imageIndex, images }

  const toggleImageExpansion = (workshopId) => {
    setExpandedImages(prev => ({
      ...prev,
      [workshopId]: !prev[workshopId]
    }));
  };

  const openLightbox = (workshopId, imageIndex, images) => {
    setLightboxImage({ workshopId, imageIndex, images });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction) => {
    if (!lightboxImage) return;
    
    const { imageIndex, images } = lightboxImage;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (imageIndex + 1) % images.length;
    } else {
      newIndex = (imageIndex - 1 + images.length) % images.length;
    }
    
    setLightboxImage({
      ...lightboxImage,
      imageIndex: newIndex
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxImage) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  if (!workshops || workshops.length === 0) {
    return (
      <div className="retreat-workshops">
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No workshops available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="retreat-workshops">
        {workshops.map((workshop) => {
          const imageUrls = workshop.imageUrls || [];
          const hasMoreThanThree = imageUrls.length > 3;
          const isExpanded = expandedImages[workshop.id];
          const displayImages = isExpanded ? imageUrls : imageUrls.slice(0, 3);
          
          return (
            <div key={workshop.id} className="retreat-workshop-card">
              <div className="workshop-header">
                <h3 className="workshop-title">{workshop.title}</h3>
                <div className="workshop-meta">
                  <div className="workshop-date">📅 {workshop.dates}</div>
                  <div className="workshop-location">📍 {workshop.location}</div>
                </div>
              </div>

              {/* Image Gallery - After title/location, before overview */}
              {imageUrls.length > 0 && (
                <div className="workshop-image-gallery">
                  <div className="workshop-images-grid">
                    {displayImages.map((imageUrl, displayIndex) => {
                      // Find the actual index in the full array
                      const actualIndex = imageUrls.indexOf(imageUrl);
                      return (
                        <div
                          key={actualIndex}
                          className="workshop-image-item"
                          onClick={() => openLightbox(workshop.id, actualIndex, imageUrls)}
                        >
                          <img
                            src={imageUrl}
                            alt={`${workshop.title} - Image ${actualIndex + 1}`}
                            className="workshop-image"
                            loading="lazy"
                          />
                        </div>
                      );
                    })}
                  </div>
                  {hasMoreThanThree && (
                    <button
                      className="workshop-show-more-btn"
                      onClick={() => toggleImageExpansion(workshop.id)}
                    >
                      {isExpanded ? 'Show Less' : `Show More (${imageUrls.length - 3} more)`}
                    </button>
                  )}
                </div>
              )}

              <div className="workshop-section">
                <h4 className="section-title">🌍 Overview</h4>
                <p className="section-text">{workshop.overview}</p>
                <p className="workshop-tagline">{workshop.tagline}</p>
              </div>

          {workshop.objectives && workshop.objectives.length > 0 && (
            <div className="workshop-section">
              <h4 className="section-title">🎯 Objectives</h4>
              <ul className="section-list">
                {workshop.objectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {workshop.program && workshop.program.length > 0 && (
            <div className="workshop-section">
              <h4 className="section-title">📅 Program Outline</h4>
              <div className="program-timeline">
                {workshop.program.map((day, idx) => (
                  <div key={idx} className="program-day">
                    <span className="program-date">{day.date}</span>
                    <span className="program-activity">{day.activity}</span>
                  </div>
                ))}
              </div>
              {workshop.dailyRhythm && (
                <p className="section-text-small">{workshop.dailyRhythm}</p>
              )}
            </div>
          )}

          {workshop.accommodation && workshop.accommodation.length > 0 && (
            <div className="workshop-section">
              <h4 className="section-title">🏕️ Accommodation</h4>
              <p className="section-text">Participants can choose from partner stays:</p>
              <ul className="section-list">
                {workshop.accommodation.map((acc, idx) => (
                  <li key={idx}>{acc}</li>
                ))}
              </ul>
            </div>
          )}

          {workshop.meals && (
            <div className="workshop-section">
              <h4 className="section-title">🍚 Meals</h4>
              <p className="section-text">{workshop.meals}</p>
            </div>
          )}

          {workshop.volunteerPathway && (
            <div className="workshop-section">
              <h4 className="section-title">🌱 Volunteer Pathway</h4>
              <p className="section-text">{workshop.volunteerPathway}</p>
            </div>
          )}

          {workshop.facilitators && workshop.facilitators.length > 0 && (
            <div className="workshop-section">
              <h4 className="section-title">👥 Facilitators & Partners</h4>
              <ul className="section-list">
                {workshop.facilitators.map((fac, idx) => (
                  <li key={idx}>{fac}</li>
                ))}
              </ul>
            </div>
          )}

              {workshop.story && (
                <div className="workshop-section">
                  <h4 className="section-title">📣 Story</h4>
                  <p className="workshop-story">{workshop.story}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="workshop-lightbox-overlay" onClick={closeLightbox}>
          <div className="workshop-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="workshop-lightbox-close" onClick={closeLightbox} aria-label="Close">
              ×
            </button>
            <button
              className="workshop-lightbox-nav workshop-lightbox-prev"
              onClick={() => navigateLightbox('prev')}
              aria-label="Previous image"
            >
              ‹
            </button>
            <div className="workshop-lightbox-image-container">
              <img
                src={lightboxImage.images[lightboxImage.imageIndex]}
                alt={`Image ${lightboxImage.imageIndex + 1}`}
                className="workshop-lightbox-image"
              />
              <div className="workshop-lightbox-counter">
                {lightboxImage.imageIndex + 1} / {lightboxImage.images.length}
              </div>
            </div>
            <button
              className="workshop-lightbox-nav workshop-lightbox-next"
              onClick={() => navigateLightbox('next')}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}

