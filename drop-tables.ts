import postgres from 'postgres';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = postgres(DATABASE_URL, { ssl: 'require' });

async function main() {
  try {
    const dropScript = fs.readFileSync(path.join(__dirname, 'drop-tables.sql'), 'utf8');
    await sql.unsafe(dropScript);
    console.log('Tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    await sql.end();
  }
}

main(); 