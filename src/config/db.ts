
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5433'),
  database: process.env.POSTGRES_DB || 'blogdb',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,

});

export const connectDB = async () => {
  try {
   
    const client = await pool.connect();
    console.log('PostgreSQL database connected successfully');

    pool.on('connect', () =>{
      console.log('New client connected to Postgresql')
    })

    pool.on('error', (err) =>{
      console.log('Unexpected error occur', err)
    })

    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

export default pool;