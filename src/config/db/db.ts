import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import 'dotenv/config';
import env from '../env/env';
import { users } from './schemas/user';

const pool = new Pool({
  host: 'localhost',
  port: env.db.postgres.port,
  user: env.db.postgres.user,
  password: env.db.postgres.password,
  database: env.db.postgres.database,
});

pool
  .connect()
  .then((client) => {
    console.log('✅ PostgreSQL connected successfully!');
    client.release();
  })
  .catch((err) => {
    console.error('❌ Error connecting to PostgreSQL:', err);
    process.exit(1);
  });

export const db = drizzle(pool, {
  schema: {
    users,
  },
});
