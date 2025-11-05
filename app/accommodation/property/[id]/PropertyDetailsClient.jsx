"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PropertyDetailsClient({ property }) {
  const router = useRouter();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const handleBookNow = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleBack = () => {
    router.push('/accommodation/details');
  };

  return (
    <main>
      <div className="wrap property-details-page-wrap">
        <section className="property-details-section">
          <button className="property-back-button" onClick={handleBack}>
            ← Back
          </button>
          
          <div className="property-cards-layout">
            {/* Card 1: Accommodation Title Card (Horizontal, Full Width) */}
            <div className="property-title-card">
              <h1 className="property-title-text">Accommodation</h1>
            </div>

            {/* Card 2: Room Amenities Card (Left) */}
            <div className="property-amenities-card">
              <h3 className="property-card-title">Room amenities</h3>
              <ul className="property-amenities-list">
                {property.amenities && property.amenities.length > 0 ? (
                  property.amenities.map((amenity, idx) => (
                    <li key={idx}>{amenity}</li>
                  ))
                ) : (
                  <>
                    <li>Peaceful mountain view</li>
                    <li>Queen bed</li>
                    <li>Workspace</li>
                    <li>Balcony</li>
                    <li>Ensuite bathroom</li>
                    <li>Wi-Fi</li>
                  </>
                )}
              </ul>
            </div>

            {/* Card 3: Room Details Card (Right) - Contains Boutique Cabin + Snapshot */}
            <div className="property-room-details-card">
              <div className="property-room-details-inner">
                  {/* Left: Boutique Cabin Content */}
                  <div className="property-main-content">
                  <h2 className="property-name-title">{property.name || 'Boutique Cabin'}</h2>
                  
                    {/* Image Gallery from S3 (imageUrls) */}
                    {property.imageUrls && property.imageUrls.length > 0 && (
                      <div className="property-image-gallery">
                        <div className="property-images-row">
                          {(showAllPhotos ? property.imageUrls : property.imageUrls.slice(0, 3)).map((img, idx) => (
                            <div key={idx} className="property-image-item">
                              <img src={img} alt={`${property.name} - ${idx + 1}`} />
                            </div>
                          ))}
                        </div>
                        {property.imageUrls.length > 3 && (
                          <button
                            className="property-show-photos-btn"
                            onClick={() => setShowAllPhotos(!showAllPhotos)}
                          >
                            {showAllPhotos ? 'Show Less' : 'Show all photos'}
                          </button>
                        )}
                      </div>
                    )}

                  {/* Description */}
                  <p className="property-description-text">
                    {property.description || 
                     'A cozy, private cabin with a balcony offering a peaceful view of the surrounding mountains. Ideal for solo travelers or couples.'}
                  </p>

                    {/* Book via Airbnb Button - pinned to bottom */}
                    <button
                      className="property-airbnb-button"
                      onClick={() => handleBookNow(property.url)}
                    >
                      Book via Airbnb
                    </button>
                </div>

                {/* Right: Snapshot Panel */}
                <div className="property-snapshot-panel">
                  <h3 className="property-card-title">Snapshot</h3>
                  <div className="property-snapshot-content">
                    <div className="snapshot-item snapshot-item-simple">
                      <span className="snapshot-label">{property.guests || 2} guests</span>
                    </div>
                    <div className="snapshot-item snapshot-item-simple">
                      <span className="snapshot-label">
                        {typeof property.beds === 'number' 
                          ? `${property.beds} ${property.beds === 1 ? 'bed' : 'beds'}`
                          : property.beds || '1 Queen bed'}
                      </span>
                    </div>
                    <div className="snapshot-item snapshot-item-simple">
                      <span className="snapshot-label">{property.baths || 1} bath</span>
                    </div>
                    <div className="snapshot-item snapshot-item-pair">
                      <span className="snapshot-label">Check-in</span>
                      <span className="snapshot-value">{property.checkIn || '2:00 pm'}</span>
                    </div>
                    <div className="snapshot-item snapshot-item-pair">
                      <span className="snapshot-label">Check-out</span>
                      <span className="snapshot-value">{property.checkOut || '11:00 am'}</span>
                    </div>
                    <div className="snapshot-item snapshot-item-pair">
                      <span className="snapshot-label">Minimum stay</span>
                      <span className="snapshot-value">{property.minStay || '1 night'}</span>
                    </div>
                  </div>
                  <div className="property-snapshot-decoration">🌱</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

