"use client";

import { useEffect, useState } from 'react';

export default function VisionMap({ visionContent }) {
  const [buttonText, setButtonText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  // Use provided vision content or default structure
  const content = visionContent || {
    introText1: 'Mayu.Farm becomes part of something larger — a self-sustaining, living world built in rhythm with nature.',
    introText2: "It's a world made up of three interconnected zones:",
    zones: [
      {
        name: 'dao-home',
        title: 'DAO HOME — Our Heart & Home',
        description: [
          'Where it all began — a handful of huts, a turtle pond, and an idea: to live simply, grow slowly, and share what we learn.',
          'Here, volunteers and travelers live together, tending the land, sharing meals, and dreaming under the same roof.'
        ],
        tags: ['#FarmStay', '#Community', '#Animals', '#SimpleLiving'],
        imageUrl: ''
      },
      {
        name: 'lilac',
        title: 'LILAC — Move, Breathe, Build Strength',
        description: [
          'Our gym and accommodation zone — built from bamboo and mountain air.',
          'This is where movement meets mindfulness: ice baths, mobility practice, community workouts.',
          'A place for body transformation and quiet reflection.'
        ],
        tags: ['#Strength', '#Wellness', '#Recovery', '#Discipline'],
        imageUrl: ''
      },
      {
        name: 'mayu',
        title: 'MAYU — The Learning Center',
        description: [
          'The heart of our knowledge ecosystem — where retreats, coffee roasting, and workshops happen.',
          'Here we study soil, structure, and soul, and share everything we discover.'
        ],
        tags: ['#Learning', '#Workshops', '#Retreats', '#CoffeeCulture'],
        imageUrl: ''
      }
    ],
    ecosystemImageUrl: '',
    ecosystemText1: 'Together, these spaces form a living ecosystem — a world meant to evolve, to welcome dreamers, makers, and wanderers alike.',
    ecosystemText2: 'We call it Maayu.Farm — not an all-inclusive resort, but a world in rhythm with nature, a Stardew-Valley-inspired reality where growth, connection, and creativity take root.'
  };

  const zones = content.zones || [];
  const ecosystemImageUrl = content.ecosystemImageUrl || '';
  const ecosystemText1 = content.ecosystemText1 || '';
  const ecosystemText2 = content.ecosystemText2 || '';

  const title = content.title || 'Building Our Own World';
  const description = content.description || 'Not an all-inclusive resort -but an ecosystem for growth, creation, and connection, A world we\'re building for ourselves and for anyone ready to live fully – in rhythm with nature.';
  const initialButtonText = content.buttonText || 'Explore Our World Map';
  const displayButtonText = buttonText || initialButtonText;

  const handleButtonClick = () => {
    setButtonText('Coming Soon');
  };

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  return (
    <div className="vision-map">
      <div className="vision-intro">
        <h1 className="vision-title">{title}</h1>
        <p className="vision-description">
          {description}
        </p>
        <button className="vision-explore-button" onClick={handleButtonClick}>
          {displayButtonText}
        </button>
      </div>

      <div className="vision-zones">
        {/* DAO HOME and LILAC external labels/arrows - render only on desktop/tablet */}
        {!isMobile && (
          <>
            <div className="zone-label-container dao-home-label">
              <div className="zone-label">DAO HOME</div>
              <div className="zone-arrow">↓</div>
            </div>

            <div className="zone-label-container lilac-label">
              <div className="zone-label">LILAC</div>
              <div className="zone-arrow">↓</div>
            </div>
          </>
        )}

        {zones.map((zone, index) => (
          <div key={zone.name || index} className={`vision-zone ${zone.name || ''}`}>
            <div className="zone-image-wrapper">
              {zone.imageUrl ? (
                <img 
                  src={zone.imageUrl} 
                  alt={zone.title || zone.name} 
                  className="zone-image"
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              ) : null}
            </div>
            <div className="zone-content">
              {zone.title && <div className="zone-title">{zone.title}</div>}
              <div className="zone-description">
                {Array.isArray(zone.description) ? (
                  zone.description.map((desc, descIndex) => 
                    desc ? <p key={descIndex}>{desc}</p> : null
                  )
                ) : zone.description ? (
                  <p>{zone.description}</p>
                ) : null}
              </div>
              {Array.isArray(zone.tags) && zone.tags.length > 0 && (
                <div className="zone-tags">
                  {zone.tags.map((tag, tagIndex) => 
                    tag ? <span key={tagIndex} className="tag">{tag}</span> : null
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="vision-ecosystem">
        {ecosystemImageUrl && (
          <div className="zone-image-wrapper">
            <img 
              src={ecosystemImageUrl} 
              alt="Ecosystem" 
              className="zone-image"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          </div>
        )}
        <div className="zone-content">
          {ecosystemText1 && <p>{ecosystemText1}</p>}
          {ecosystemText2 && (
            <p className="vision-mayu-farm">
              {ecosystemText2.includes('Maayu.Farm') || ecosystemText2.includes('Maayu') || ecosystemText2.includes('<strong>') ? (
                <span dangerouslySetInnerHTML={{ 
                  __html: ecosystemText2
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/(Maayu\.Farm|Maayu)/g, '<strong>$1</strong>')
                }} />
              ) : (
                <>{ecosystemText2}</>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

