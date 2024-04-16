import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { Client } from 'pg';
import { env } from '../env.mjs';
import * as schema from './schema';

config({
    path: (env.NODE_ENV !== 'production' ? '.env.local' : '.env'),
    override: true
});

const connectionString = env.DATABASE_URL as string;
export const pgClient = new Client({
    connectionString
})

export const db = drizzle(pgClient, { schema });

await migrate(db, { migrationsFolder: 'drizzle' });