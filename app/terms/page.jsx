"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import PixelSign from "../ui/PixelSign";
import MobileMenu from "../ui/MobileMenu";

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

export default function TermsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Ensure global blur/overlays are visually neutral for this page
  useEffect(() => {
    document.body.classList.add("terms-page");
    return () => document.body.classList.remove("terms-page");
  }, []);

  return (
    <main style={{ background: '#ffffff' }}>
      <Head>
        <title>Terms & Privacy | maayu.farm</title>
        <meta name="description" content="Terms of Service and Privacy Policy for maayu.farm by Vibes LLC, Chiang Dao, Thailand." />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://maayu.farm/terms" />
        <meta property="og:title" content="Terms & Privacy | maayu.farm" />
        <meta property="og:description" content="Read the Terms of Service and Privacy Policy for maayu.farm." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maayu.farm/terms" />
        <meta property="og:site_name" content="maayu.farm" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms & Privacy | maayu.farm" />
        <meta name="twitter:description" content="Read the Terms of Service and Privacy Policy for maayu.farm." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Terms & Privacy | maayu.farm',
            url: 'https://maayu.farm/terms',
            description:
              'Terms of Service and Privacy Policy for maayu.farm operated by Vibes LLC in Chiang Dao, Thailand.'
          }) }}
        />
      </Head>
      <div className="wrap">
        <div className="site-title">Terms of Service & Privacy Policy</div>
        <MobileMenu items={items} onToggle={setMenuOpen} />
        <div className={`menus scale-3x desktop-menu ${menuOpen ? "open" : ""}`}>
          {items.map((it) => (
            <PixelSign key={it.label} label={it.label} iconUrl={it.iconUrl} href={it.href} />
          ))}
        </div>
        <section className="terms-section">
          <div className="terms-content">
            <h1 className="terms-h1">Terms of Service & Privacy Policy</h1>
            <p className="panel-text" style={{ marginTop: 8 }}>
              Explore our site:
              <a href="/accommodation" style={{ marginLeft: 8 }}>Accommodation</a>,
              <a href="/volunteers" style={{ marginLeft: 8 }}>Volunteers</a>,
              <a href="/experiences" style={{ marginLeft: 8 }}>Experiences</a>,
              <a href="/retreats" style={{ marginLeft: 8 }}>Retreats</a>,
              <a href="/vision" style={{ marginLeft: 8 }}>Vision</a>,
              <a href="/gallery" style={{ marginLeft: 8 }}>Gallery</a>,
              <a href="/blog" style={{ marginLeft: 8 }}>Blog</a>.
            </p>
            <nav aria-label="On this page" style={{ margin: '0 0 16px 0' }}>
              <ul className="panel-text" style={{ listStyle: 'disc', paddingLeft: '1.25rem' }}>
                <li><a href="#platform-services">Our Platform and Services</a></li>
                <li><a href="#ownership">Ownership and Management</a></li>
                <li><a href="#eligibility">Eligibility and Participation</a></li>
                <li><a href="#volunteering">Volunteering and Skill Exchange</a></li>
                <li><a href="#bookings">Accommodation and Bookings</a></li>
                <li><a href="#payments">Payments and Fees</a></li>
                <li><a href="#events">Events, Retreats, and Workshops</a></li>
                <li><a href="#conduct">Conduct and Community Standards</a></li>
                <li><a href="#liability">Health, Safety, and Liability</a></li>
                <li><a href="#ip">Intellectual Property</a></li>
                <li><a href="#privacy">Privacy and Data</a></li>
                <li><a href="#disclaimers">Disclaimers</a></li>
                <li><a href="#limitation">Limitation of Liability</a></li>
                <li><a href="#amendments">Amendments</a></li>
                <li><a href="#law">Governing Law and Jurisdiction</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
            <div className="panel-section">
              <h2 className="panel-title">Terms of Service — maayu.farm</h2>
              <p className="panel-text"><strong>Last Updated:</strong> November 2025</p>
              <p className="panel-text">
                These Terms of Service (“Terms”) govern your use of the maayu.farm website, retreats, volunteering programs, and related services (collectively, the “Platform”) operated by Vibes LLC (“we,” “us,” or “our”), a registered company based in Chiang Dao, Thailand.
              </p>
              <p className="panel-text">
                By accessing or using maayu.farm, participating in our programs, staying at our properties, or engaging in our events, you agree to be bound by these Terms. If you do not agree, please do not use the Platform or participate in our offerings.
              </p>

              <h2 id="platform-services" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>1. Our Platform and Services</h2>
              <p className="panel-text">maayu.farm operates as a community-based hospitality and creative event platform combining accommodation, volunteering, and cultural experiences in Northern Thailand.</p>
              <p className="panel-text">Our services include:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Accommodation and hospitality across properties under the Mayu and DAO Home network</li>
                <li>Volunteering and skill exchange programs</li>
                <li>Workshops, retreats, and creative residencies</li>
                <li>Event hosting, catering, and private group stays</li>
                <li>Café and on-site community activities</li>
              </ul>
              <p className="panel-text">All services and programs are subject to availability and may be updated or paused seasonally.</p>

              <h2 id="ownership" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>2. Ownership and Management</h2>
              <p className="panel-text">maayu.farm is owned and operated by Vibes LLC, based in:<br/>Hua Khuan, Chiang Dao District, Chiang Mai, Thailand</p>
              <p className="panel-text">Contact:<br/>📧 <a href="mailto:hello@maayu.farm">hello@maayu.farm</a><br/>📞 (+66) (to be filled by admin)</p>
              <p className="panel-text">Vibes LLC operates the maayu.farm brand and related entities (including DAO Home and DAO Projects) as part of its community and event operations.</p>

              <h2 id="eligibility" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>3. Eligibility and Participation</h2>
              <p className="panel-text">You must be at least 18 years old to book accommodation or participate in a volunteering or event program independently. Participants under 18 must have parental or guardian consent.</p>
              <p className="panel-text">By using our Platform or joining a program, you confirm that:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>You provide accurate and truthful information when applying or booking.</li>
                <li>You are responsible for your own health, travel insurance, and safety.</li>
                <li>You understand that maayu.farm is a community project, not a conventional hotel or tour agency.</li>
              </ul>

              <h2 id="volunteering" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>4. Volunteering and Skill Exchange</h2>
              <p className="panel-text">Volunteering at maayu.farm is an experience-based exchange, not formal employment. Volunteers may contribute in areas like natural building, hospitality, gardening, cooking, or art projects.</p>
              <p className="panel-text">Volunteers agree that:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Participation is voluntary and not a paid contract.</li>
                <li>Contributions are exchanged for accommodation, meals, and community experiences.</li>
                <li>Working hours, roles, and expectations are clearly communicated upon arrival.</li>
                <li>Vibes LLC and maayu.farm are not liable for injury, illness, or property loss during volunteering.</li>
                <li>Volunteers must comply with local Thai laws and property guidelines.</li>
                <li>We reserve the right to end participation if a volunteer engages in misconduct, disrespect, or unsafe behavior.</li>
              </ul>

              <h2 id="bookings" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>5. Accommodation and Bookings</h2>
              <p className="panel-text">Accommodation may be offered across different properties (e.g., Mayu Farm, DAO Home, Lilac).</p>
              <p className="panel-text">Bookings may be made:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Through our website, partner platforms (Airbnb, Worldpackers, etc.), or directly by email or phone.</li>
                <li>Bookings are confirmed only after a deposit or written confirmation.</li>
              </ul>
              <p className="panel-text"><strong>Cancellations:</strong></p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Refund and cancellation policies vary per property or retreat and are communicated at the time of booking.</li>
                <li>Deposits are typically non-refundable, except in cases of emergency or property-related cancellation.</li>
              </ul>
              <p className="panel-text"><strong>House Rules:</strong></p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Guests and volunteers must respect community spaces, pets, and shared living guidelines.</li>
                <li>Smoking, drug use, or disruptive behavior is not permitted in shared areas.</li>
              </ul>

              <h2 id="payments" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>6. Payments and Fees</h2>
              <p className="panel-text">All payments (accommodation, retreats, or workshops) are processed via:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Bank transfer</li>
                <li>Thai QR / PromptPay</li>
                <li>Cash on arrival (for select stays)</li>
              </ul>
              <p className="panel-text">We do not process credit card payments online at this time.</p>
              <p className="panel-text">Volunteering stays may include a daily contribution fee (for meals and facilities) which is non-refundable once the program begins.</p>
              <p className="panel-text">maayu.farm and Vibes LLC are not responsible for:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Currency conversion or bank fees</li>
                <li>Lost payments caused by incorrect transfer information</li>
              </ul>

              <h2 id="events" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>7. Events, Retreats, and Workshops</h2>
              <p className="panel-text">maayu.farm regularly hosts community events, natural building workshops, and creative retreats.</p>
              <p className="panel-text">By registering or attending, participants agree that:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Event fees are non-refundable unless canceled by organizers.</li>
                <li>Media (photo/video) captured during events may be used for future promotion, unless the participant opts out in writing.</li>
                <li>Activities may involve physical labor or outdoor conditions; participants join at their own risk.</li>
              </ul>

              <h2 id="conduct" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>8. Conduct and Community Standards</h2>
              <p className="panel-text">All guests, volunteers, and visitors agree to:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Treat others with respect, care, and inclusivity.</li>
                <li>Avoid any form of harassment, discrimination, or violence.</li>
                <li>Respect the property, animals, and environment.</li>
                <li>Follow Thai laws and local customs.</li>
              </ul>
              <p className="panel-text">We reserve the right to remove any participant or guest who violates these principles without refund.</p>

              <h2 id="liability" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>9. Health, Safety, and Liability</h2>
              <p className="panel-text">You understand and agree that:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Participation in farm activities, construction, or workshops involves inherent physical risks.</li>
                <li>You are solely responsible for your personal safety, travel insurance, and medical coverage.</li>
                <li>maayu.farm and Vibes LLC assume no liability for injury, illness, or property loss during your stay or participation.</li>
                <li>Guests should disclose any allergies or medical conditions prior to arrival.</li>
              </ul>

              <h2 id="ip" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>10. Intellectual Property</h2>
              <p className="panel-text">All content on maayu.farm (text, photos, logos, videos, and graphics) is owned or licensed by Vibes LLC. You may not copy, reproduce, or use content without prior written permission.</p>
              <p className="panel-text">By submitting photos, testimonials, or videos voluntarily, you grant us a non-exclusive, royalty-free right to use them for promotional or educational purposes unless you opt out in writing.</p>

              <h2 id="privacy" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>11. Privacy and Data</h2>
              <p className="panel-text">We respect your privacy. Personal information (name, email, passport copy, etc.) is collected only for booking, visa assistance, or volunteer coordination purposes. We do not sell or share data with third parties except as required by Thai law. Please refer to the Privacy Policy section below for more details on data handling.</p>

              <h2 id="disclaimers" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>12. Disclaimers</h2>
              <p className="panel-text">maayu.farm operates as a community and event space, not a luxury resort or formal employment agency. We do not guarantee:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Any particular experience outcome</li>
                <li>Availability of certain hosts or workshops</li>
                <li>Continuous internet access or specific amenities</li>
              </ul>
              <p className="panel-text">All programs and facilities are subject to seasonal availability and maintenance.</p>

              <h2 id="limitation" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>13. Limitation of Liability</h2>
              <p className="panel-text">To the fullest extent permitted by Thai law:</p>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>Vibes LLC and maayu.farm are not liable for any indirect, incidental, or consequential damages arising from participation or stay.</li>
                <li>Our responsibility is limited to the refund of confirmed accommodation or program fees in cases where we cancel the booking ourselves.</li>
              </ul>

              <h2 id="amendments" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>14. Amendments</h2>
              <p className="panel-text">These Terms may be updated occasionally. The latest version will always be available at <code>maayu.farm/terms</code> with a new “Last Updated” date. Continued use or participation constitutes acceptance of any updates.</p>

              <h2 id="law" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>15. Governing Law and Jurisdiction</h2>
              <p className="panel-text">These Terms are governed by the laws of the Kingdom of Thailand. Any disputes shall be resolved in the courts of Chiang Mai Province.</p>

              <h2 id="contact" className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>16. Contact</h2>
              <p className="panel-text">For questions about these Terms:<br/>📧 <a href="mailto:hello@maayu.farm">hello@maayu.farm</a><br/>📍 Vibes LLC, Chiang Dao, Chiang Mai, Thailand</p>

              <h2 className="panel-title" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>17. Summary (Plain Language)</h2>
              <ul className="panel-text" style={{ paddingLeft: '1.25rem', listStyle: 'disc' }}>
                <li>maayu.farm is a community-based space for retreats, volunteering, and creative stays.</li>
                <li>Bookings and volunteering are handled directly with our team.</li>
                <li>We don’t process online payments or assume liability for personal or travel issues.</li>
                <li>Be kind, safe, and respectful — you’re part of a shared home.</li>
                <li>By joining, you agree to these terms and to the spirit of conscious living.</li>
              </ul>
            </div>

            <div className="panel-section" style={{ marginTop: '2rem' }}>
              <div className="panel-title">Privacy Policy</div>
              <p className="panel-text">
                We value your privacy. We collect only the information needed to manage bookings, visa assistance, volunteer coordination, and communications (such as name, email, and documents you provide). We do not sell your data. We may share information only when required by Thai law or to fulfill services you request. If you have questions or wish to request data access or deletion, contact <a href="mailto:hello@maayu.farm">hello@maayu.farm</a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

