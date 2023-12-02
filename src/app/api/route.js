
// PRAGMA foreign_keys = ON;

import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db = null;

// Define the GET request handler function
export async function GET(req, res) {
  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./collection.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve all matches from the "matches" table
  const matches = await db.all("SELECT * FROM matches");
  const players = await db.all("SELECT * FROM players");

  // Return the matches and players as a JSON response with status 200
  return new Response(JSON.stringify({ matches, players }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}