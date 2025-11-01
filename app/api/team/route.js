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
    // Fetch all team members with their skills
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

    // Parse the data and format it for the frontend
    const members = result.rows.map(member => {
      // Parse skills (already JSON from PostgreSQL)
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

      // Parse socialLinks if it's a string
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
        photo: member.photoUrl || null, // S3 URL from AWS bucket
        order: member.order || 0,
        socialLinks: socialLinks,
        skills: skills, // Array of { id, name, level }
      };
    });

    return Response.json({
      members: members,
      count: members.length,
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return Response.json(
      { 
        error: 'Failed to fetch team members', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

