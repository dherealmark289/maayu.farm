import { Pool } from 'pg';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env from root folder
const rootDir = resolve(process.cwd(), '..');
config({ path: resolve(rootDir, '.env.local') });

// Create database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('supabase') ? { rejectUnauthorized: false } : false,
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');

    // For public frontend, only fetch published posts
    let query = `
      SELECT * FROM blog_posts 
      WHERE published = true AND "publishedAt" IS NOT NULL
    `;
    const params = [];
    const conditions = [];

    // Filter by category if provided
    if (category) {
      conditions.push('category = $' + (params.length + 1));
      params.push(category);
    }

    // Filter by slug if provided (for individual post view)
    if (slug) {
      conditions.push('slug = $' + (params.length + 1));
      params.push(slug);
    }

    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }

    query += ' ORDER BY "publishedAt" DESC';

    const result = await pool.query(query, params);

    // Parse arrays if they're strings (PostgreSQL arrays)
    const parsedPosts = result.rows.map(post => {
      // Ensure tags is an array
      let tags = post.tags || [];
      if (!Array.isArray(tags)) {
        // If it's a PostgreSQL array string, parse it
        if (typeof tags === 'string' && tags.startsWith('{')) {
          tags = tags.slice(1, -1).split(',').map(tag => tag.trim().replace(/"/g, ''));
        } else {
          tags = [];
        }
      }

      return {
        ...post,
        tags,
        featuredImage: post.featuredImage || null, // S3 URL from AWS bucket
      };
    });

    return Response.json({
      posts: parsedPosts,
      count: parsedPosts.length,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return Response.json(
      { 
        error: 'Failed to fetch blog posts', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

