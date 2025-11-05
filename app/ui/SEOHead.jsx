"use client";

import { useEffect } from "react";

/**
 * SEO Head component for adding structured data and breadcrumbs
 * @param {Object} props
 * @param {string} props.pageName - Name of the page
 * @param {string} props.path - URL path (e.g., "/vision", "/retreats")
 * @param {string} props.description - Page description with keywords
 * @param {string} [props.schemaType] - Additional schema type (e.g., "ItemList", "CollectionPage")
 */
export default function SEOHead({ pageName, path, description, schemaType = "WebPage" }) {
  useEffect(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : "https://maayu.farm";
    const pageUrl = `${baseUrl}${path}`;
    
    // Breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": pageName,
          "item": pageUrl
        }
      ]
    };

    // WebPage schema
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": `${pageName} - MAAYU.FARM`,
      "alternateName": [`${pageName} - Mayu Farm`, `${pageName} - mayu.farm`, `${pageName} - mayo.farm`],
      "url": pageUrl,
      "description": description,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbSchema.itemListElement
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "MAAYU.FARM",
        "alternateName": ["Mayu Farm", "mayu.farm", "mayo.farm"]
      }
    };

    // Remove existing scripts if any
    const existingBreadcrumb = document.getElementById('breadcrumb-schema');
    const existingPage = document.getElementById('page-schema');
    if (existingBreadcrumb) existingBreadcrumb.remove();
    if (existingPage) existingPage.remove();

    // Add breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'breadcrumb-schema';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // Add page schema
    const pageScript = document.createElement('script');
    pageScript.id = 'page-schema';
    pageScript.type = 'application/ld+json';
    pageScript.textContent = JSON.stringify(webPageSchema);
    document.head.appendChild(pageScript);

    // Cleanup
    return () => {
      if (breadcrumbScript.parentNode) breadcrumbScript.parentNode.removeChild(breadcrumbScript);
      if (pageScript.parentNode) pageScript.parentNode.removeChild(pageScript);
    };
  }, [pageName, path, description, schemaType]);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : "https://maayu.farm";
  const pageUrl = `${baseUrl}${path}`;

  return (
    <>
      {/* Hidden Breadcrumb for SEO */}
      <nav aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList" style={{ display: 'none' }}>
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href={baseUrl}>
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href={pageUrl}>
              <span itemProp="name">{pageName}</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>
    </>
  );
}

