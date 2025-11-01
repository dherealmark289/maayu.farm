"use client";

import { useState } from "react";

export default function AnimalGrid({ animals }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const onOpen = (animal) => {
    setSelected(animal);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <>
      <div className="team-main-card">
        <h2 className="team-main-title">Animals</h2>
        <div className="team-grid">
          {animals.map((animal) => (
            <button 
              key={animal.id} 
              type="button"
              className="member-card"
              onClick={() => onOpen(animal)}
            >
              <div className={`member-media${animal.photoUrls && animal.photoUrls.length > 0 ? "" : " empty"}`}>
                {animal.photoUrls && animal.photoUrls.length > 0 ? (
                  <img alt={animal.name} src={animal.photoUrls[0]} />
                ) : null}
              </div>
              <div className="member-name">{animal.name}</div>
              {animal.species && (
                <div className="member-role">{animal.species}</div>
              )}
            </button>
          ))}
        </div>
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
                <div className={`panel-photo${selected.photoUrls && selected.photoUrls.length > 0 ? "" : " empty"}`}>
                  {selected.photoUrls && selected.photoUrls.length > 0 ? (
                    <img alt={selected.name} src={selected.photoUrls[0]} />
                  ) : null}
                </div>
                <div className="panel-name">{selected.name}</div>
                {selected.species ? <div className="panel-role">{selected.species}</div> : null}
                {selected.breed ? (
                  <div className="panel-group">{selected.breed}</div>
                ) : null}
                {selected.status && (
                  <div className="panel-group">Status: {selected.status}</div>
                )}
              </div>
              <div className="panel-right">
                {selected.bio && (
                  <div className="panel-section">
                    <div className="panel-title">About</div>
                    <p className="panel-text">{selected.bio}</p>
                  </div>
                )}
                
                {selected.healthInfo && (
                  <div className="panel-section">
                    <div className="panel-title">Health Information</div>
                    <p className="panel-text">{selected.healthInfo}</p>
                  </div>
                )}

                {selected.photoUrls && selected.photoUrls.length > 1 && (
                  <div className="panel-section">
                    <div className="panel-title">Photos</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px', marginTop: '8px' }}>
                      {selected.photoUrls.slice(1).map((photoUrl, idx) => (
                        <img 
                          key={idx}
                          src={photoUrl} 
                          alt={`${selected.name} photo ${idx + 2}`}
                          style={{
                            width: '100%',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            border: '2px solid var(--frame-dark)',
                          }}
                        />
                      ))}
                    </div>
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

