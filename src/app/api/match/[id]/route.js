import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Let's initialize it as null initially, and we will assign the actual database instance later.
let db = null;

// Define the GET request handler function
export async function GET(req, res) {
  // Extract the "id" from the URL by splitting the URL and taking the last element
  const id = req.url.split("/").pop();

  // Log the extracted "id" to the console (for debugging purposes)
  console.log(id);

  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./collection.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve an item based on the id
  try {
    const items = await db.all(
      `
      SELECT m.*, p.*, pm.*
      FROM matches m
      JOIN players_matches pm ON m.match_id = pm.match_id
      JOIN players p ON pm.player_id = p.player_id
      WHERE m.match_id = ?`,
      id
    );

    if (items) {
      // Return the data if a match is found
      return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      // Return a 404 response if no match is found
      return new Response("Match not found", {
        headers: { "Content-Type": "text/plain" },
        status: 404,
      });
    }
  } catch (error) {
    // Handle database errors
    console.error("Database error:", error);
    return new Response("Internal Server Error", {
      headers: { "Content-Type": "text/plain" },
      status: 500,
    });
  }
}
