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
    // Ensure imageUrls column exists
    try {
      await pool.query('ALTER TABLE retreat_workshops ADD COLUMN IF NOT EXISTS "imageUrls" TEXT[]');
    } catch (e) {
      // Column might already exist, ignore error
    }

    const result = await pool.query(`
      SELECT 
        id,
        title,
        dates,
        location,
        overview,
        tagline,
        objectives,
        program,
        "dailyRhythm" as "dailyRhythm",
        accommodation,
        meals,
        "volunteerPathway" as "volunteerPathway",
        facilitators,
        story,
        "imageUrls",
        published,
        "order",
        "createdAt",
        "updatedAt"
      FROM retreat_workshops
      WHERE published = true
      ORDER BY "order" ASC, "createdAt" DESC
    `);

    const workshops = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      dates: row.dates,
      location: row.location,
      overview: row.overview,
      tagline: row.tagline,
      objectives: Array.isArray(row.objectives) ? row.objectives : [],
      program: row.program ? (Array.isArray(row.program) ? row.program : JSON.parse(row.program)) : [],
      dailyRhythm: row.dailyRhythm,
      accommodation: Array.isArray(row.accommodation) ? row.accommodation : [],
      meals: row.meals,
      volunteerPathway: row.volunteerPathway,
      facilitators: Array.isArray(row.facilitators) ? row.facilitators : [],
      story: row.story,
      imageUrls: Array.isArray(row.imageUrls) ? row.imageUrls : [],
      published: row.published,
      order: row.order,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));

    return Response.json({ workshops });
  } catch (error) {
    console.error('Error fetching retreat workshops:', error);
    return Response.json(
      { error: error.message || 'Failed to fetch retreat workshops' },
      { status: 500 }
    );
  }
}

