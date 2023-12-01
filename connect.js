// run node connect.js to create the database

const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the players table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY,
      match_id INTEGER,
      name TEXT,
      media TEXT,
      team TEXT,
      goals INTEGER,
      pass_d TEXT,
      comment_team TEXT,
      comment_player TEXT,
      player_average TEXT
  )`);

  // Create the matches table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY,
      media_video TEXT,
      team1 TEXT,
      team2 TEXT,
      score1 INTEGER,
      score2 INTEGER,
      team_average INTEGER
  )`);

  // Clear the existing data in the matches and players tables
  db.run(`DELETE FROM players`);
  db.run(`DELETE FROM matches`);

  // Insert new data into the players table
  const playersData = [
    {
      name: "Steph",
      media: "link",
      team: "Équipe A",
      goals: 2,
      pass_d: "3",
      comment_team: ["comment 1", "comment 2"],
      comment_player: ["mon comment 1", "mon comment 2"],
      player_average: "3.5",
    },
    // ... (ajoutez d'autres joueurs)

  ];

  playersData.forEach((player) => {
    const insertPlayerSql = `INSERT INTO players(name, media, team, goals, pass_d, comment_team, comment_player, player_average) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(
      insertPlayerSql,
      [
        player.name,
        player.media,
        player.team,
        player.goals,
        player.pass_d,
        JSON.stringify(player.comment_team),
        JSON.stringify(player.comment_player),
        player.player_average,
      ],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        const playerId = this.lastID; // get the id of the last inserted player row
        console.log(`Player inserted, ID ${playerId}`);
      });
  });

  // Insert new data into the matches table
  const matchesData = [
    {
      media_video: "link",
      team1: "Équipe A",
      team2: "Équipe B",
      score1: 3,
      score2: 2,
      team_average: "3.5",
    },
    // ... (ajoutez d'autres matchs)
  ];

  matchesData.forEach((match) => {
    const insertMatchSql = `INSERT INTO matches(media_video, team1, team2, score1, score2, team_average) VALUES(?, ?, ?, ?, ?, ?)`;

    db.run(
      insertMatchSql,
      [
        match.media_video,
        match.team1,
        match.team2,
        match.score1,
        match.score2,
        match.team_average,
      ],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        const matchId = this.lastID; // get the id of the last inserted match row
        console.log(`Match inserted, ID ${matchId}`);
      });
  });

  // Close the database connection after all insertions are done
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection.");
  });
});
