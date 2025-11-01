// Server-side data fetching for static generation at build time
// These functions run during build time in server components
// They query the database directly instead of going through API routes

import { Pool } from 'pg';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env from root folder
const rootDir = resolve(process.cwd(), '..');
config({ path: resolve(rootDir, '.env.local') });

// Create database connection pool (same as API routes)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('supabase') ? { rejectUnauthorized: false } : false,
});

export async function fetchExperiences() {
  try {
    const result = await pool.query(`
      SELECT * FROM experiences 
      WHERE published = true
      ORDER BY "order" ASC, "createdAt" DESC
    `);

    const experiences = result.rows.map(row => ({
      ...row,
      includes: Array.isArray(row.includes) ? row.includes : 
                (typeof row.includes === 'string' && row.includes.startsWith('{') 
                  ? row.includes.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''))
                  : []),
      bring: Array.isArray(row.bring) ? row.bring : 
             (typeof row.bring === 'string' && row.bring.startsWith('{')
               ? row.bring.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''))
               : []),
      imageUrls: Array.isArray(row.imageUrls) ? row.imageUrls : 
                 (typeof row.imageUrls === 'string' && row.imageUrls.startsWith('{')
                   ? row.imageUrls.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''))
                   : []),
    }));

    return experiences;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

export async function fetchWorkshops() {
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

    return workshops;
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return [];
  }
}

export async function fetchVisionContent() {
  try {
    const result = await pool.query(`
      SELECT * FROM vision_content
      ORDER BY "createdAt" DESC
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return null;
    }

    const visionContent = result.rows[0];
    
    // Parse zones if they're stored as JSON string or JSONB object
    let zones = [];
    if (visionContent.zones) {
      if (typeof visionContent.zones === 'string') {
        try {
          zones = JSON.parse(visionContent.zones);
        } catch (e) {
          zones = [];
        }
      } else if (Array.isArray(visionContent.zones)) {
        zones = visionContent.zones;
      }
    }

    return {
      ...visionContent,
      zones: zones,
    };
  } catch (error) {
    console.error('Error fetching vision content:', error);
    return null;
  }
}

export async function fetchAnimals() {
  try {
    const result = await pool.query(`
      SELECT * FROM animals 
      WHERE status = 'available' OR status IS NULL
      ORDER BY "createdAt" DESC
    `);

    const animals = result.rows.map(animal => {
      let photoUrls = animal.photoUrls || [];
      if (!Array.isArray(photoUrls)) {
        if (typeof photoUrls === 'string' && photoUrls.startsWith('{')) {
          photoUrls = photoUrls.slice(1, -1).split(',').map(url => url.trim().replace(/"/g, ''));
        } else {
          photoUrls = [];
        }
      }

      return {
        ...animal,
        photoUrls,
      };
    });

    return animals;
  } catch (error) {
    console.error('Error fetching animals:', error);
    return [];
  }
}

export async function fetchBlogPosts() {
  try {
    const result = await pool.query(`
      SELECT * FROM blog_posts 
      WHERE published = true AND "publishedAt" IS NOT NULL
      ORDER BY "publishedAt" DESC
    `);

    const posts = result.rows.map(post => {
      let tags = post.tags || [];
      if (!Array.isArray(tags)) {
        if (typeof tags === 'string' && tags.startsWith('{')) {
          tags = tags.slice(1, -1).split(',').map(tag => tag.trim().replace(/"/g, ''));
        } else {
          tags = [];
        }
      }

      return {
        ...post,
        tags,
        featuredImage: post.featuredImage || null,
      };
    });

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchGalleryAlbums() {
  try {
    const result = await pool.query(`
      SELECT 
        a.*,
        COUNT(gi.id) as "actualImageCount"
      FROM gallery_albums a
      LEFT JOIN gallery_images gi ON a.id = gi."albumId"
      GROUP BY a.id
      ORDER BY a."createdAt" DESC
    `);

    return result.rows || [];
  } catch (error) {
    console.error('Error fetching gallery albums:', error);
    return [];
  }
}

export async function fetchTeamMembers() {
  try {
    const result = await pool.query(`
      SELECT 
        tm.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', s.id,
              'name', s.name,
              'level', tms.level
            )
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'::json
        ) as skills
      FROM team_members tm
      LEFT JOIN team_member_skills tms ON tm.id = tms."teamMemberId"
      LEFT JOIN skills s ON tms."skillId" = s.id
      GROUP BY tm.id
      ORDER BY COALESCE(tm."order", 0) ASC, tm."createdAt" ASC
    `);

    const members = result.rows.map(member => {
      let skills = [];
      if (member.skills && typeof member.skills === 'string') {
        try {
          skills = JSON.parse(member.skills);
        } catch (e) {
          skills = [];
        }
      } else if (Array.isArray(member.skills)) {
        skills = member.skills;
      }

      let socialLinks = member.socialLinks;
      if (typeof member.socialLinks === 'string') {
        try {
          socialLinks = JSON.parse(member.socialLinks);
        } catch (e) {
          socialLinks = null;
        }
      }

      return {
        id: member.id,
        name: member.name,
        role: member.role,
        bio: member.bio || null,
        group: member.group || null,
        photo: member.photoUrl || null,
        order: member.order || 0,
        socialLinks: socialLinks,
        skills: skills,
      };
    });

    return members;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function fetchAccommodation() {
  try {
    const result = await pool.query(`
      SELECT * FROM accommodations 
      WHERE available = true
      ORDER BY "createdAt" DESC
    `);

    const accommodations = result.rows.map(acc => {
      let whatOffers = acc.whatOffers;
      if (typeof acc.whatOffers === 'string') {
        try {
          whatOffers = JSON.parse(acc.whatOffers);
        } catch (e) {
          whatOffers = acc.whatOffers;
        }
      }

      let imageUrls = acc.imageUrls || [];
      if (!Array.isArray(imageUrls)) {
        if (typeof imageUrls === 'string' && imageUrls.startsWith('{')) {
          imageUrls = imageUrls.slice(1, -1).split(',').map(url => url.trim().replace(/"/g, ''));
        } else {
          imageUrls = [];
        }
      }

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
        imageUrls,
        amenities,
        price: acc.price ? parseFloat(acc.price) : null,
      };
    });

    return accommodations;
  } catch (error) {
    console.error('Error fetching accommodation:', error);
    return [];
  }
}
