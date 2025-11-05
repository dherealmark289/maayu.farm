export default function robots() {
  const site = 'https://maayu.farm';
  return {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}


