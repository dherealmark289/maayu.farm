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
    // Fetch all animals from database
    const result = await pool.query(`
      SELECT * FROM animals 
      WHERE status = 'available' OR status IS NULL
      ORDER BY "createdAt" DESC
    `);

    // Parse arrays if they're strings
    const parsedAnimals = result.rows.map(animal => {
      // Ensure photoUrls is an array (these are S3 URLs)
      let photoUrls = animal.photoUrls || [];
      if (!Array.isArray(photoUrls)) {
        // If it's a PostgreSQL array string, parse it
        if (typeof photoUrls === 'string' && photoUrls.startsWith('{')) {
          photoUrls = photoUrls.slice(1, -1).split(',').map(url => url.trim().replace(/"/g, ''));
        } else {
          photoUrls = [];
        }
      }

      return {
        ...animal,
        photoUrls, // These are already S3 URLs from the bucket
      };
    });

    return Response.json({
      animals: parsedAnimals,
      count: parsedAnimals.length,
    });
  } catch (error) {
    console.error('Error fetching animals:', error);
    return Response.json(
      { 
        error: 'Failed to fetch animals', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

