import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import { env } from '../env.mjs';
import * as schema from './schema';

config({
    path: (env.NODE_ENV !== 'production' ? '.env.local' : '.env'),
    override: true
});

const { Client } = pg
const connectionString = env.DATABASE_URL as string;
export const pgClient = new Client({
    connectionString
})

export const drizzleDB = drizzle(pgClient, { schema });

(async () => {
    await pgClient.connect();

    await migrate(drizzleDB, { migrationsFolder: 'drizzle' });
})();