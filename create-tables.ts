import postgres from 'postgres';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = postgres(DATABASE_URL, { ssl: 'require' });

async function main() {
  try {
    // Drop existing tables
    await sql.unsafe(`
      DROP TABLE IF EXISTS chat_messages CASCADE;
      DROP TABLE IF EXISTS chat_sessions CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS faqs CASCADE;
    `);

    // Create tables
    await sql.unsafe(`
      -- Create users table
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
      );

      -- Create chat_sessions table
      CREATE TABLE IF NOT EXISTS chat_sessions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          session_token TEXT NOT NULL UNIQUE,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      -- Create chat_messages table
      CREATE TABLE IF NOT EXISTS chat_messages (
          id SERIAL PRIMARY KEY,
          session_id INTEGER REFERENCES chat_sessions(id) NOT NULL,
          message TEXT NOT NULL,
          role TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      -- Create faqs table
      CREATE TABLE IF NOT EXISTS faqs (
          id SERIAL PRIMARY KEY,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          category TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await sql.end();
  }
}

main(); 