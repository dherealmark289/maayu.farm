# Accommodation Page Setup

## What's Needed to Fetch Data

### 1. **Environment Variables** ✓
- **Location**: `D:\mayu admin\.env.local` (root folder)
- **Required**: `DATABASE_URL` 
- **Status**: ✅ Found in root folder

### 2. **Prisma Client** 
- **Location**: Generated in `frontend/node_modules/.prisma/client`
- **Generate**: Run `npm run prisma:generate` in frontend folder
- **Status**: Needs to be generated

### 3. **Prisma Schema** ✓
- **Location**: `frontend/prisma/schema.prisma`
- **Model**: `Accommodation` model exists
- **Status**: ✅ Schema ready

### 4. **Database Connection**
- **Source**: `DATABASE_URL` from root `.env.local`
- **Connection**: Prisma Client connects to Supabase PostgreSQL
- **Status**: ✅ Connection string found

## Files Created

1. **`frontend/app/api/accommodation/route.js`** - API route to fetch accommodations
2. **`frontend/app/ui/AccommodationGrid.jsx`** - Card component (similar to TeamGrid)
3. **`frontend/app/accommodation/page.jsx`** - Page that fetches and displays accommodations
4. **`frontend/lib/prisma.js`** - Updated to load `.env.local` from root folder

## Setup Steps

1. **Generate Prisma Client**:
   ```bash
   cd frontend
   npm run prisma:generate
   ```

2. **Push Schema to Database** (if not done):
   ```bash
   npm run prisma:push
   ```

3. **Run Frontend**:
   ```bash
   npm run dev
   ```

## How It Works

1. **Page loads** → `frontend/app/accommodation/page.jsx`
2. **Fetches data** → Calls `/api/accommodation`
3. **API route** → `frontend/app/api/accommodation/route.js`
4. **Prisma queries** → Uses Prisma Client (loads DATABASE_URL from root `.env.local`)
5. **Database** → Fetches from `accommodations` table
6. **Returns data** → JSON response with accommodations
7. **Displays cards** → AccommodationGrid component renders cards

## Data Fetched

- `name` - Property name
- `imageUrls` - Array of image URLs (shows first image in card)
- `type` - Room type (single, double, etc.)
- `price` - Price per night
- `capacity` - Number of guests
- `description` - Full description
- `whatOffers` - Amenities/features
- `amenities` - Additional amenities
- `hostedBy` - Host name
- `location` - Location details
- `houseRules` - House rules
- `safety` - Safety information
- `url` - Booking link (Airbnb/Booking.com)

## Troubleshooting

If data doesn't load:

1. **Check DATABASE_URL**: Make sure it's in root `.env.local`
2. **Generate Prisma Client**: Run `npm run prisma:generate` in frontend folder
3. **Check Database**: Make sure accommodations exist in database (available = true)
4. **Check Console**: Look for errors in browser console and server logs

