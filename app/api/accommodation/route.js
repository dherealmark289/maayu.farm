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
    // Fetch all accommodations from database
    const result = await pool.query(`
      SELECT * FROM accommodations 
      WHERE available = true
      ORDER BY "createdAt" DESC
    `);

    // Parse JSON fields if they're strings and handle arrays
    const parsedAccommodations = result.rows.map(acc => {
      let whatOffers = acc.whatOffers;
      if (typeof acc.whatOffers === 'string') {
        try {
          whatOffers = JSON.parse(acc.whatOffers);
        } catch (e) {
          // If parsing fails, keep as is
          whatOffers = acc.whatOffers;
        }
      }

      // Ensure imageUrls is an array (these are S3 URLs)
      let imageUrls = acc.imageUrls || [];
      if (!Array.isArray(imageUrls)) {
        // If it's a PostgreSQL array string, parse it
        if (typeof imageUrls === 'string' && imageUrls.startsWith('{')) {
          imageUrls = imageUrls.slice(1, -1).split(',').map(url => url.trim().replace(/"/g, ''));
        } else {
          imageUrls = [];
        }
      }

      // Ensure amenities is an array
      let amenities = acc.amenities || [];
      if (!Array.isArray(amenities)) {
        if (typeof amenities === 'string' && amenities.startsWith('{')) {
          amenities = amenities.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''));
        } else {
          amenities = [];
        }
      }

      return {
        ...acc,
        whatOffers,
        imageUrls, // These are already S3 URLs from the bucket
        amenities,
        price: acc.price ? parseFloat(acc.price) : null,
      };
    });

    return Response.json({
      accommodations: parsedAccommodations,
      count: parsedAccommodations.length,
    });
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    return Response.json(
      { 
        error: 'Failed to fetch accommodations', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

