import { Pool } from 'pg';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from root .env.local
const rootDir = resolve(process.cwd(), '..');
config({ path: resolve(rootDir, '.env.local') });

// Create database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('supabase') ? { rejectUnauthorized: false } : false,
});

export async function GET(request) {
  try {
    // Fetch vision content (get first record or return default)
    const result = await pool.query(`
      SELECT * FROM vision_content
      ORDER BY "createdAt" DESC
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      // Return default structure
      return Response.json({
        visionContent: {
          id: null,
          introText1: 'Mayu.Farm becomes part of something larger — a self-sustaining, living world built in rhythm with nature.',
          introText2: "It's a world made up of three interconnected zones:",
          zones: [
            {
              name: 'dao-home',
              title: 'DAO HOME — Our Heart & Home',
              description: [
                'Where it all began — a handful of huts, a turtle pond, and an idea: to live simply, grow slowly, and share what we learn.',
                'Here, volunteers and travelers live together, tending the land, sharing meals, and dreaming under the same roof.'
              ],
              tags: ['#FarmStay', '#Community', '#Animals', '#SimpleLiving'],
              imageUrl: ''
            },
            {
              name: 'lilac',
              title: 'LILAC — Move, Breathe, Build Strength',
              description: [
                'Our gym and accommodation zone — built from bamboo and mountain air.',
                'This is where movement meets mindfulness: ice baths, mobility practice, community workouts.',
                'A place for body transformation and quiet reflection.'
              ],
              tags: ['#Strength', '#Wellness', '#Recovery', '#Discipline'],
              imageUrl: ''
            },
            {
              name: 'mayu',
              title: 'MAYU — The Learning Center',
              description: [
                'The heart of our knowledge ecosystem — where retreats, coffee roasting, and workshops happen.',
                'Here we study soil, structure, and soul, and share everything we discover.'
              ],
              tags: ['#Learning', '#Workshops', '#Retreats', '#CoffeeCulture'],
              imageUrl: ''
            }
          ],
          ecosystemImageUrl: '',
          ecosystemText1: 'Together, these spaces form a living ecosystem — a world meant to evolve, to welcome dreamers, makers, and wanderers alike.',
          ecosystemText2: 'We call it Maayu.Farm — not an all-inclusive resort, but a world in rhythm with nature, a Stardew-Valley-inspired reality where growth, connection, and creativity take root.'
        }
      });
    }

    const visionContent = result.rows[0];
    
    // Parse zones if they're stored as JSON string or JSONB object
    let zones = [];
    if (visionContent.zones) {
      if (typeof visionContent.zones === 'string') {
        try {
          zones = JSON.parse(visionContent.zones);
        } catch (e) {
          console.error('Error parsing zones JSON:', e);
          zones = [];
        }
      } else if (Array.isArray(visionContent.zones)) {
        zones = visionContent.zones;
      } else if (typeof visionContent.zones === 'object') {
        // If it's a JSONB object, it should already be parsed by pg
        zones = Array.isArray(visionContent.zones) ? visionContent.zones : [];
      }
    }

    return Response.json({
      visionContent: {
        ...visionContent,
        zones: zones,
      }
    });
  } catch (error) {
    console.error('Error fetching vision content:', error);
    return Response.json(
      { 
        error: 'Failed to fetch vision content', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

