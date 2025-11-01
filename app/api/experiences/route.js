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

export async function GET() {
  try {
    // Ensure experiences table exists
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS experiences (
          id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
          title TEXT NOT NULL,
          subtitle TEXT,
          category TEXT,
          duration TEXT,
          "priceTHB" INTEGER,
          difficulty TEXT,
          capacity TEXT,
          schedule TEXT,
          includes TEXT[],
          bring TEXT[],
          image TEXT,
          "imageUrls" TEXT[],
          cta TEXT,
          link TEXT,
          badge TEXT,
          published BOOLEAN DEFAULT false,
          "order" INTEGER DEFAULT 0,
          "createdAt" TIMESTAMP DEFAULT NOW(),
          "updatedAt" TIMESTAMP DEFAULT NOW()
        )
      `);
    } catch (e) {
      // Table might already exist, ignore error
    }

    // Ensure imageUrls column exists
    try {
      await pool.query('ALTER TABLE experiences ADD COLUMN IF NOT EXISTS "imageUrls" TEXT[]');
    } catch (e) {
      // Column might already exist, ignore error
    }

    const result = await pool.query(`
      SELECT 
        id,
        title,
        subtitle,
        category,
        duration,
        "priceTHB",
        difficulty,
        capacity,
        schedule,
        includes,
        bring,
        image,
        "imageUrls",
        cta,
        link,
        badge,
        published,
        "order",
        "createdAt",
        "updatedAt"
      FROM experiences
      WHERE published = true
      ORDER BY "order" ASC, "createdAt" DESC
    `);

    const experiences = result.rows.map(row => {
      // Ensure arrays are properly parsed
      let includes = row.includes || [];
      if (!Array.isArray(includes)) {
        if (typeof includes === 'string' && includes.startsWith('{')) {
          includes = includes.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''));
        } else {
          includes = [];
        }
      }

      let bring = row.bring || [];
      if (!Array.isArray(bring)) {
        if (typeof bring === 'string' && bring.startsWith('{')) {
          bring = bring.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''));
        } else {
          bring = [];
        }
      }

      let imageUrls = row.imageUrls || [];
      if (!Array.isArray(imageUrls)) {
        if (typeof imageUrls === 'string' && imageUrls.startsWith('{')) {
          imageUrls = imageUrls.slice(1, -1).split(',').map(url => url.trim().replace(/"/g, ''));
        } else {
          imageUrls = [];
        }
      }

      return {
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        category: row.category,
        duration: row.duration,
        priceTHB: row.priceTHB,
        difficulty: row.difficulty,
        capacity: row.capacity,
        schedule: row.schedule,
        includes: includes,
        bring: bring,
        image: row.image,
        imageUrls: imageUrls,
        cta: row.cta,
        link: row.link,
        badge: row.badge,
        published: row.published,
        order: row.order,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      };
    });

    return Response.json({ experiences });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return Response.json(
      { error: error.message || 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

