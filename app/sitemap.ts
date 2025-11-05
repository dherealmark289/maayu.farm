export default async function sitemap() {
  const site = 'https://maayu.farm';
  const now = new Date();
  const routes = [
    '/',
    '/vision',
    '/retreats',
    '/experiences',
    '/volunteers',
    '/accommodation',
    '/accommodation/details',
    '/gallery',
    '/animals',
    '/team',
    '/blog',
    '/terms',
  ];

  return routes.map((path) => ({
    url: `${site}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}


