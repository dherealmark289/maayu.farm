# Database Setup Guide

## Step 1: Add Your Supabase Connection String

1. Create a `.env.local` file in the root directory (same level as `package.json`)
2. Add your Supabase connection string:

```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

**Note:** If you encounter connection errors, try using Supabase's **Connection Pooler** instead:
1. In Supabase Dashboard > Settings > Database > Connection string
2. Select **"Connection pooling"** tab instead of **"URI"** tab
3. Use port **6543** (pooler) instead of **5432** (direct)
4. Make sure to URL encode any special characters in your password (! becomes %21, @ becomes %40, etc.)

**Where to find it:**
- Go to https://supabase.com
- Select your project
- Settings > Database > Connection string > URI tab
- Copy the connection string and replace `[YOUR-PASSWORD]` with your actual password

## Step 2: Create the Database Table

Run this command to push the schema to your Supabase database:

```bash
npm run prisma:push
```

This will create the `retreats` table in your Supabase database.

## Step 3: Verify Setup

You can verify everything is working by:

1. Opening Prisma Studio (visual database browser):
   ```bash
   npm run prisma:studio
   ```
   This will open a browser where you can view and edit your database.

2. Test the form:
   - Go to `/retreats` page
   - Fill out the form
   - Submit it
   - Check in Prisma Studio or Supabase dashboard to see the data

## Troubleshooting

- **Connection error**: Make sure your `.env.local` file has the correct DATABASE_URL
- **Table not found**: Run `npm run prisma:push` again
- **Prisma client error**: Run `npm run prisma:generate`

## Database Structure

The `retreats` table has the following fields:
- `id` (UUID, auto-generated)
- `name` (String, required)
- `country` (String, optional)
- `phone` (String, optional)
- `email` (String, optional)
- `days` (Integer, optional)
- `calling` (String, optional)
- `createdAt` (DateTime, auto-generated)
- `updatedAt` (DateTime, auto-updated)

