"use client";

import { useState } from "react";
import PixelSign from "./PixelSign";
import MobileMenu from "./MobileMenu";
import RetreatCards from "./RetreatCards";

const items = [
  { label: "home", href: "/", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/House/3D/house_3d.png" },
  { label: "vision", href: "/vision", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Herb/3D/herb_3d.png" },
  { label: "retreats", href: "/retreats", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Camping/3D/camping_3d.png" },
  { label: "experiences", href: "/experiences", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Star/3D/star_3d.png" },
  { label: "volunteers", href: "/volunteers", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Handshake/3D/handshake_3d.png" },
  { label: "accommodation", href: "/accommodation", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Hotel/3D/hotel_3d.png" },
  { label: "animals", href: "/animals", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Paw%20Prints/3D/paw_prints_3d.png" },
  { label: "team", href: "/team", iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f465.svg" },
  { label: "blog", href: "/blog", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Notebook/3D/notebook_3d.png" },
  { label: "gallery", href: "/gallery", iconUrl: "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji/assets/Framed%20Picture/3D/framed_picture_3d.png" }
];

export default function RetreatsClient({ initialWorkshops }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const closeModal = () => {
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      country: formData.get('country'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      days: formData.get('days'),
      calling: formData.get('calling'),
    };

    try {
      const response = await fetch('/api/retreat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thank you! Your retreat application has been submitted successfully.' });
        e.target.reset(); // Reset the form
      } else {
        setMessage({ type: 'error', text: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ type: 'error', text: 'Failed to submit. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div className="wrap retreats-page-wrap">
        <MobileMenu items={items} onToggle={setMenuOpen} />
        <div className={`menus scale-3x desktop-menu ${menuOpen ? "open" : ""}`}>
          {items.map((it) => (
            <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
          ))}
        </div>
        {/* Modal Popup */}
        {message.text && (
          <div className="form-modal-overlay" onClick={closeModal}>
            <div className="form-modal" onClick={(e) => e.stopPropagation()}>
              <button className="form-modal-close" onClick={closeModal} aria-label="Close">
                ×
              </button>
              <div className={`form-modal-content ${message.type === 'success' ? 'form-modal-success' : 'form-modal-error'}`}>
                <div className="form-modal-text">{message.text}</div>
              </div>
            </div>
          </div>
        )}
        <section className="retreats-section">
          <div className="retreats-intro">
            <div className="retreats-title-card">
              <h1 className="retreats-title">JOIN OUR RETREATS</h1>
            </div>
            <p className="retreats-description">
              Experience life at DAO Home through our immersive retreat programs.
            </p>
            <p className="retreats-description">
              Connect with nature, learn new skills, and be part of our sustainable community.
            </p>
          </div>
          
          <RetreatCards initialWorkshops={initialWorkshops} />

          <div className="retreat-form-section">
            <div className="retreat-form-title-card">
              <h2 className="retreat-form-title">Apply for a Retreat</h2>
            </div>
            <div className="retreat-card ui-sign notched-90">
            <form className="retreat-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label className="field">
                  <span className="field-label">Name</span>
                  <input className="px-input" type="text" name="name" required disabled={isSubmitting} />
                </label>
                <label className="field">
                  <span className="field-label">Country</span>
                  <input className="px-input" type="text" name="country" disabled={isSubmitting} />
                </label>
                <label className="field">
                  <span className="field-label">Phone number</span>
                  <input className="px-input" type="tel" name="phone" disabled={isSubmitting} />
                </label>
                <label className="field">
                  <span className="field-label">Email</span>
                  <input className="px-input" type="email" name="email" disabled={isSubmitting} />
                </label>
                <label className="field">
                  <span className="field-label">Number of days</span>
                  <input className="px-input" type="number" name="days" min="1" max="60" disabled={isSubmitting} />
                </label>
                <label className="field field-wide">
                  <span className="field-label">What's your calling?</span>
                  <textarea className="px-input" name="calling" rows="3" disabled={isSubmitting} />
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn ui-sign notched-90" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
          </div>
        </section>
      </div>
    </main>
  );
}
