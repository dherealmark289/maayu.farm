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
    const albumId = searchParams.get('albumId');

    // Create tables if they don't exist (they should already exist, but just in case)
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS gallery_albums (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          description TEXT,
          "coverImageUrl" VARCHAR(500),
          "imageCount" INTEGER DEFAULT 0,
          "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS gallery_images (
          id VARCHAR(255) PRIMARY KEY,
          "albumId" VARCHAR(255) NOT NULL,
          filename VARCHAR(255) NOT NULL,
          "originalName" VARCHAR(255) NOT NULL,
          "mimeType" VARCHAR(255) NOT NULL,
          size INTEGER NOT NULL,
          url VARCHAR(500) NOT NULL,
          alt TEXT,
          description TEXT,
          "uploadedBy" VARCHAR(255),
          "order" INTEGER DEFAULT 0,
          "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (e) {
      // Tables might already exist, ignore
    }

    if (albumId) {
      // Fetch images for a specific album
      const imagesResult = await pool.query(`
        SELECT * FROM gallery_images 
        WHERE "albumId" = $1
        ORDER BY "order" ASC, "createdAt" DESC
      `, [albumId]);

      return Response.json({
        images: imagesResult.rows || [],
        count: imagesResult.rows.length,
      });
    } else {
      // Fetch all albums with image counts
      const albumsResult = await pool.query(`
        SELECT 
          a.*,
          COUNT(gi.id) as "actualImageCount"
        FROM gallery_albums a
        LEFT JOIN gallery_images gi ON a.id = gi."albumId"
        GROUP BY a.id
        ORDER BY a."createdAt" DESC
      `);

      return Response.json({
        albums: albumsResult.rows || [],
        count: albumsResult.rows.length,
      });
    }
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return Response.json(
      { 
        error: 'Failed to fetch gallery', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

