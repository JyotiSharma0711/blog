
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'bloguser',
  password: process.env.POSTGRES_PASSWORD || 'blogpassword',
  host: process.env.POSTGRES_HOST || 'db',
  port: parseInt(process.env.POSTGRES_PORT || '5433'),
  database: process.env.POSTGRES_DB || 'blogdb'
});

export const connectDB = async () => {
  try {
   
    const client = await pool.connect();
    console.log('PostgreSQL database connected successfully');
    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

export default pool;