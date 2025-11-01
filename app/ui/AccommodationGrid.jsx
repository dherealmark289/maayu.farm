"use client";

import { useState } from "react";

export default function AccommodationGrid({ accommodations }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showMoreOffers, setShowMoreOffers] = useState(false);

  const onOpen = (accommodation) => {
    setSelected(accommodation);
    setOpen(true);
    setShowMoreOffers(false); // Reset show more when opening new accommodation
  };

  const onClose = () => {
    setOpen(false);
    setSelected(null);
    setShowMoreOffers(false);
  };

  return (
    <>
      <div className="team-grid">
        {accommodations.map((acc) => (
          <div 
            key={acc.id} 
            className="member-card ui-sign notched-90"
          >
            <button
              type="button"
              onClick={() => onOpen(acc)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div className={`member-media${acc.imageUrls && acc.imageUrls.length > 0 ? "" : " empty"}`}>
                {acc.imageUrls && acc.imageUrls.length > 0 ? (
                  <img alt={acc.name} src={acc.imageUrls[0]} />
                ) : null}
              </div>
              <div className="member-name">{acc.name}</div>
            </button>
            {acc.url && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(acc.url, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  width: '100%',
                  marginTop: 'auto',
                  padding: '8px 16px',
                  background: '#c97c32',
                  color: '#fff',
                  border: '2px solid var(--frame-dark)',
                  cursor: 'pointer',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px',
                  boxShadow: 'inset -2px -2px var(--frame-light), inset 2px 2px var(--frame-dark)',
                  textTransform: 'uppercase',
                }}
              >
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>

      <div 
        className={`team-modal ${open ? "open" : ""}`} 
        onClick={onClose} 
        aria-hidden={open ? "false" : "true"}
      >
        <div className="team-panel ui-sign notched-90" onClick={(e) => e.stopPropagation()}>
          {selected ? (
            <div className="team-panel-inner">
              <div className="panel-left">
                <div className={`panel-photo${selected.imageUrls && selected.imageUrls.length > 0 ? "" : " empty"}`}>
                  {selected.imageUrls && selected.imageUrls.length > 0 ? (
                    <img alt={selected.name} src={selected.imageUrls[0]} />
                  ) : null}
                </div>
                <div className="panel-name">{selected.name}</div>
                {selected.type ? <div className="panel-role">{selected.type}</div> : null}
                {selected.hostedBy ? (
                  <div className="panel-group">Hosted by: {selected.hostedBy}</div>
                ) : null}
                {selected.price ? (
                  <div className="panel-group">${parseFloat(selected.price).toFixed(2)} / night</div>
                ) : null}
                {selected.capacity ? (
                  <div className="panel-group">Capacity: {selected.capacity} guests</div>
                ) : null}
              </div>
              <div className="panel-right">
                {selected.description && (
                  <div className="panel-section">
                    <div className="panel-title">Description</div>
                    <p className="panel-text">{selected.description}</p>
                  </div>
                )}
                
                {selected.whatOffers && (() => {
                  // Extract offers array
                  let offers = [];
                  let additional = null;
                  
                  if (Array.isArray(selected.whatOffers)) {
                    offers = selected.whatOffers;
                  } else if (typeof selected.whatOffers === 'object' && selected.whatOffers !== null) {
                    if (selected.whatOffers.options && Array.isArray(selected.whatOffers.options)) {
                      offers = selected.whatOffers.options;
                    }
                    if (selected.whatOffers.additional) {
                      additional = selected.whatOffers.additional;
                    }
                  }

                  const displayCount = showMoreOffers ? offers.length : 5;
                  const hasMore = offers.length > 5;

                  return (
                    <div className="panel-section">
                      <div className="panel-title">What This Place Offers</div>
                      <div className="panel-text">
                        <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                          {offers.slice(0, displayCount).map((offer, idx) => (
                            <li key={idx}>{offer}</li>
                          ))}
                        </ul>
                        {hasMore && (
                          <button
                            type="button"
                            onClick={() => setShowMoreOffers(!showMoreOffers)}
                            style={{
                              marginTop: '10px',
                              padding: '6px 12px',
                              background: '#c97c32',
                              color: '#fff',
                              border: '2px solid var(--frame-dark)',
                              cursor: 'pointer',
                              fontFamily: "'Press Start 2P', monospace",
                              fontSize: '8px',
                              boxShadow: 'inset -2px -2px var(--frame-light), inset 2px 2px var(--frame-dark)',
                            }}
                          >
                            {showMoreOffers ? 'Show Less' : 'Show More'}
                          </button>
                        )}
                        {additional && (
                          <p style={{ marginTop: '10px' }}>{additional}</p>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {selected.amenities && selected.amenities.length > 0 && (
                  <div className="panel-section">
                    <div className="panel-title">Amenities</div>
                    <div className="panel-text">
                      <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                        {selected.amenities.map((amenity, idx) => (
                          <li key={idx}>{amenity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {selected.location && (
                  <div className="panel-section">
                    <div className="panel-title">Location</div>
                    <p className="panel-text">{selected.location}</p>
                  </div>
                )}

                {selected.houseRules && (
                  <div className="panel-section">
                    <div className="panel-title">House Rules</div>
                    <p className="panel-text">{selected.houseRules}</p>
                  </div>
                )}

                {selected.safety && (
                  <div className="panel-section">
                    <div className="panel-title">Safety</div>
                    <p className="panel-text">{selected.safety}</p>
                  </div>
                )}

                {selected.url && (
                  <div className="panel-section">
                    <div className="panel-title">Book Now</div>
                    <button
                      type="button"
                      onClick={() => window.open(selected.url, '_blank', 'noopener,noreferrer')}
                      style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        background: '#c97c32',
                        color: '#fff',
                        border: '2px solid var(--frame-dark)',
                        cursor: 'pointer',
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '10px',
                        boxShadow: 'inset -2px -2px var(--frame-light), inset 2px 2px var(--frame-dark)',
                        textTransform: 'uppercase',
                      }}
                    >
                      View on Airbnb/Booking.com
                    </button>
                  </div>
                )}
              </div>
              <button type="button" className="panel-close" onClick={onClose}>×</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

