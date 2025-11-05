"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccommodationDetailsClient({ initialAccommodations = [] }) {
  const router = useRouter();
  const [accommodations] = useState(initialAccommodations);
  const [selectedZone, setSelectedZone] = useState(null);

  // Get unique zones from accommodations
  const getUniqueZones = () => {
    const zones = accommodations
      .map(acc => acc.zone)
      .filter(zone => zone && zone.trim() !== '')
      .map(zone => zone.toLowerCase());
    return [...new Set(zones)];
  };

  // Format zone name for display (e.g., "dao-home" -> "DAO HOME")
  const formatZoneName = (zone) => {
    if (!zone) return '';
    return zone
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Filter accommodations by selected zone
  const getAccommodationsByZone = (zone) => {
    if (!zone) {
      // If no zone selected, show all accommodations
      // For now, find "Tiny Home" and "Farm Stay" as before
      const findAccommodation = (searchTerms) => {
        const lowerSearchTerms = searchTerms.map(term => term.toLowerCase());
        return accommodations.find(acc => {
          const name = (acc.name || '').toLowerCase();
          const type = (acc.type || '').toLowerCase();
          return lowerSearchTerms.some(term => name.includes(term) || type.includes(term));
        });
      };
      const tinyHome = findAccommodation(['tiny home', 'tiny', 'tinyhouse']);
      const farmStay = findAccommodation(['farm stay', 'farmstay', 'boutique cabin', 'boutique']);
      return [
        tinyHome || accommodations[0],
        farmStay || accommodations[1]
      ].filter(Boolean);
    }
    return accommodations.filter(acc => acc.zone && acc.zone.toLowerCase() === zone.toLowerCase());
  };

  const uniqueZones = getUniqueZones();
  const displayAccommodations = getAccommodationsByZone(selectedZone);

  const handleBookNow = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleBack = () => {
    router.push('/accommodation');
  };

  return (
    <main>
      <div className="wrap accommodation-details-wrap">
        <section className="accommodation-details-section">
          <div className="accommodation-details-map">
            <button className="accommodation-back-button" onClick={handleBack}>
              ← Back
            </button>
            <div className="accommodation-details-intro">
              <div className="accommodation-title-card">
                <h1 className="accommodation-details-title">Stay in Our Little World</h1>
              </div>
              
              <div className="accommodation-zone-buttons">
                {uniqueZones.length > 0 ? (
                  uniqueZones.map((zone, index) => (
                    <button
                      key={zone || index}
                      className={`zone-button ${selectedZone === zone ? 'active' : ''}`}
                      onClick={() => setSelectedZone(selectedZone === zone ? null : zone)}
                    >
                      {formatZoneName(zone)}
                    </button>
                  ))
                ) : (
                  <>
                    <button 
                      className={`zone-button dao-home-button ${selectedZone === 'dao-home' ? 'active' : ''}`}
                      onClick={() => setSelectedZone(selectedZone === 'dao-home' ? null : 'dao-home')}
                    >
                      DAO HOME
                    </button>
                    <button 
                      className={`zone-button ${selectedZone === 'lilac' ? 'active' : ''}`}
                      onClick={() => setSelectedZone(selectedZone === 'lilac' ? null : 'lilac')}
                    >
                      LILAC
                    </button>
                    <button 
                      className={`zone-button ${selectedZone === 'common' ? 'active' : ''}`}
                      onClick={() => setSelectedZone(selectedZone === 'common' ? null : 'common')}
                    >
                      Common
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="accommodation-details-cards">
              {displayAccommodations.length === 0 ? (
                <div className="accommodation-details-main-card">
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>No accommodations available.</p>
                  </div>
                </div>
              ) : (
                <div className="accommodation-details-main-card">
                  <div className="details-card-header">
                    <div className="details-card-title-section">
                      <div className="details-card-main-title">Stay Among the Trees</div>
                    </div>
                  </div>
                  
                  <div className="details-card-description">
                    Where it all began - handcrafted teak and bamboo cabins built around our turtle pond. Perfect for slow mornings and bonfire nights.
                  </div>

                  <div className="details-card-subsections">
                    {displayAccommodations.map((acc, index) => (
                      <div key={acc.id || index} className="details-subsection">
                        <div className="subsection-image">
                          {acc.imageUrls && acc.imageUrls.length > 0 ? (
                            <img 
                              src={acc.imageUrls[0]} 
                              alt={acc.name || 'Accommodation'}
                              className="subsection-image-img"
                            />
                          ) : (
                            <div className="subsection-image-placeholder"></div>
                          )}
                        </div>
                        <div className="subsection-content">
                          <div className="subsection-title">{acc.name || 'Accommodation'}</div>
                          {acc.type && (
                            <div className="subsection-subtitle">{acc.type}</div>
                          )}
                          <div className="subsection-buttons">
                            <button 
                              className="subsection-view-btn"
                              onClick={() => router.push(`/accommodation/property/${acc.id || acc.name?.toLowerCase().replace(/\s+/g, '-')}`)}
                            >
                              VIEW NOW
                            </button>
                            <button 
                              className="subsection-book-btn"
                              onClick={() => handleBookNow(acc.url)}
                            >
                              BOOK NOW
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

    </main>
  );
}
