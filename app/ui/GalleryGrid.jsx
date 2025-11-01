"use client";

import { useState } from "react";

export default function GalleryGrid({ albums }) {
  const [open, setOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const onOpen = async (album) => {
    setSelectedAlbum(album);
    setOpen(true);
    setLoadingImages(true);
    setAlbumImages([]);

    try {
      const response = await fetch(`/api/gallery?albumId=${album.id}`);
      if (response.ok) {
        const data = await response.json();
        setAlbumImages(data.images || []);
      }
    } catch (err) {
      console.error('Error fetching album images:', err);
    } finally {
      setLoadingImages(false);
    }
  };

  const onClose = () => {
    setOpen(false);
    setSelectedAlbum(null);
    setAlbumImages([]);
  };

  return (
    <>
      <div className="team-main-card">
        <h2 className="team-main-title">Albums</h2>
        <div className="team-grid">
          {albums.map((album) => (
            <button 
              key={album.id} 
              type="button" 
              className="member-card"
              onClick={() => onOpen(album)}
            >
              <div className={`member-media${album.coverImageUrl ? "" : " empty"}`}>
                {album.coverImageUrl ? (
                  <img alt={album.name} src={album.coverImageUrl} />
                ) : null}
              </div>
              <div className="member-name">{album.name}</div>
              {album.imageCount > 0 && (
                <div className="member-role">
                  {album.imageCount} {album.imageCount === 1 ? 'image' : 'images'}
                </div>
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
          {selectedAlbum ? (
            <div className="team-panel-inner">
              <div className="panel-left">
                <div className={`panel-photo${selectedAlbum.coverImageUrl ? "" : " empty"}`}>
                  {selectedAlbum.coverImageUrl ? (
                    <img alt={selectedAlbum.name} src={selectedAlbum.coverImageUrl} />
                  ) : null}
                </div>
                <div className="panel-name">{selectedAlbum.name}</div>
                {selectedAlbum.description && (
                  <div className="panel-group">{selectedAlbum.description}</div>
                )}
                {selectedAlbum.imageCount > 0 && (
                  <div className="panel-group">{selectedAlbum.imageCount} {selectedAlbum.imageCount === 1 ? 'image' : 'images'}</div>
                )}
              </div>
              <div className="panel-right">
                <div className="panel-section">
                  <div className="panel-title">Gallery Images</div>
                  {loadingImages ? (
                    <p className="panel-text">Loading images...</p>
                  ) : albumImages.length === 0 ? (
                    <p className="panel-text">No images in this album yet.</p>
                  ) : (
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                      gap: '12px',
                      marginTop: '12px'
                    }}>
                      {albumImages.map((image) => (
                        <div key={image.id} style={{ position: 'relative' }}>
                          <img 
                            src={image.url} 
                            alt={image.alt || image.originalName}
                            style={{
                              width: '100%',
                              height: '150px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              border: '2px solid var(--frame-dark)',
                              cursor: 'pointer',
                            }}
                            onClick={() => window.open(image.url, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button type="button" className="panel-close" onClick={onClose}>×</button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

