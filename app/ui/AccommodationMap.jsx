"use client";

import { useRouter } from "next/navigation";

export default function AccommodationMap() {
  const router = useRouter();

  const handleShowMore = () => {
    router.push('/accommodation/details');
  };
  return (
    <div className="accommodation-map">
      <div className="accommodation-intro">
        <div className="accommodation-title-card">
          <h1 className="accommodation-title">STAY WITH US IN THE VALLEY</h1>
        </div>
        <p className="accommodation-description">
          Every hut at DAO Home is hand-built, using local wood and natural materials.
        </p>
        <p className="accommodation-description">
          Each stay supports our vision of creating a self-sustaining world – one cabin at a time.
        </p>
      </div>

      <div className="accommodation-cards">
        {/* Main Boutique Cabin Card */}
        <div className="accommodation-main-card">
          <div className="card-header">
            <div className="card-avatar">
              <img src="/accomadation1.png" alt="Boutique Cabin" className="avatar-image" />
            </div>
            <div className="card-title-section">
              <div className="card-main-title">Boutique Cabin - Peaceful Mountain View</div>
            </div>
          </div>
          
          <div className="card-offers-section">
            <div className="offers-title">What This Place Offers</div>
            <div className="offers-list">
              <div className="offer-item">
                <span className="offer-icon">🧴</span>
                <span>Cleaning Products</span>
              </div>
              <div className="offer-item">
                <span className="offer-icon">🧴</span>
                <span>Conditioner</span>
              </div>
              <div className="offer-item">
                <span className="offer-icon">🍃</span>
                <span>Body Soap</span>
              </div>
              <div className="offer-item">
                <span className="offer-icon">🚿</span>
                <span>Outdoor Shower</span>
              </div>
            </div>
          </div>

          <div className="card-buttons">
            <button className="card-button show-more-btn" onClick={handleShowMore}>Show More</button>
            <button className="card-button airbnb-btn">View on AIRBNB</button>
          </div>
        </div>

        {/* Smaller Card */}
        <div className="accommodation-small-card">
          <div className="small-card-arrow">↑</div>
          <div className="small-card-title">BOUTIQUE CABIN</div>
          <div className="small-card-subtitle">Peaceful Mountain</div>
          <div className="small-card-host">Hosted by Mark - Sleeps 2</div>
        </div>
      </div>
    </div>
  );
}

