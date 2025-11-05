"use client";

import { useEffect } from 'react';

export default function HeadLinks() {
  useEffect(() => {
    // Preload critical background images
    const preloadLinks = [
      { href: '/background1.png', as: 'image' },
      { href: '/background2.png', as: 'image' },
    ];

    preloadLinks.forEach(({ href, as }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Preconnect for faster DNS resolution
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = window.location.origin;
    document.head.appendChild(preconnect);
  }, []);

  return null;
}

