import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// For ESM modules, use process.cwd() which works in Next.js
// Load .env from root folder (parent directory of frontend)
const rootDir = resolve(process.cwd(), '..')
config({ path: resolve(rootDir, '.env.local') })

// Also try .env as fallback
if (!process.env.DATABASE_URL) {
  config({ path: resolve(rootDir, '.env') })
}

const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


