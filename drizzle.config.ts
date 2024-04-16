import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
dotenv.config({
    path: (process.env.NODE_ENV !== 'production' ? '.env.local' : '.env'),
    override: true
})

export default {
    schema: './src/db/schema.ts',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
} satisfies Config