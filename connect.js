const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQLite database.");
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the matches table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS matches (
      match_id INTEGER PRIMARY KEY,
      media_video TEXT,
      team1_name TEXT,
      team2_name TEXT,
      team1_score INTEGER,
      team2_score INTEGER,
      match_average REAL
    )`);

  // Create the players table if it doesn't exist
  db.run(`
  CREATE TABLE IF NOT EXISTS players (
    player_id INTEGER PRIMARY KEY,
    name TEXT,
    media TEXT,
    team TEXT,
    comment_team TEXT,
    comment_player TEXT,
    player_average REAL
  )`);

  // Create the players_matches table associating players and matches
  db.run(`
    CREATE TABLE IF NOT EXISTS players_matches (
      player_match_id INTEGER PRIMARY KEY,
      goals INTEGER,
      assists INTEGER,
      shoots INTEGER,
      average FLOAT,
      player_id INTEGER,
      match_id INTEGER,
      coach_comment TEXT,
      player_comment TEXT,
      FOREIGN KEY (match_id) REFERENCES matches(match_id),
      FOREIGN KEY (player_id) REFERENCES matches(player_id),
      UNIQUE(player_id, match_id)
    )`);

  // Insert matches data
  const matchesData = [
    {
      media_video: "link",
      team1_name: "equipe_a",
      team2_name: "equipe_b",
      team1_score: 15,
      team2_score: 12,
      match_average: "3.5",
    },
    {
      media_video: "link",
      team1_name: "equipe_a",
      team2_name: "equipe_b",
      team1_score: 8,
      team2_score: 12,
      match_average: "3.5",
    },
  ];

  const insertMatchSql = `
    INSERT INTO matches(media_video, team1_name, team2_name, team1_score, team2_score, match_average)
    VALUES(?, ?, ?, ?, ?, ?)
  `;

  matchesData.forEach((match) => {
    db.run(
      insertMatchSql,
      [
        match.media_video,
        match.team1_name,
        match.team2_name,
        match.team1_score,
        match.team2_score,
        match.match_average,
      ],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        const matchId = this.lastID; // get the id of the last inserted match
        console.log(`Match inserted, ID ${matchId}`);
      }
    );
  });

  const playersData = [
    {
      player_id: 1,
      name: "Steph",
      media: "/medias/steph.jpg",
      team: "equipe_a",
      comment_team: ["comment 1", "comment 2"],
      comment_player: ["mon comment 1", "mon comment 2"],
      player_average: 3.5,
    },
    {
      player_id: 2,
      name: "Pedro",
      media: "/medias/pedro.jpg",
      team: "equipe_a",
      comment_team: ["comment 1", "comment 2"],
      comment_player: ["mon comment 1", "mon comment 2"],
      player_average: 7.5,
    },
    {
      player_id: 3,
      name: "Tom",
      media: "/medias/tom.jpg",
      team: "equipe_a",
      comment_team: ["comment 1", "comment 2"],
      comment_player: ["mon comment 1", "mon comment 2"],
      player_average: 6.5,
    },
    {
      player_id: 4,
      name: "Quentin",
      media: "/medias/quentin.jpg",
      team: "equipe_a",
      comment_team: ["comment 1", "comment 2"],
      comment_player: ["mon comment 1", "mon comment 2"],
      player_average: 8,
    },
    {
      player_id: 5,
      name: "Ben",
      media: "/medias/ben.jpg",
      team: "equipe_a",
      comment_team: ["comment 1", "comment 2"],
      comment_player: ["mon comment 1", "mon comment 2"],
      player_average: 4,
    },
  ];

  const insertPlayerSql = `
  INSERT INTO players(name, media, team, comment_team, comment_player, player_average)
  VALUES(?, ?, ?, ?, ?, ?)
`;

  playersData.forEach((player) => {
    db.run(
      insertPlayerSql,
      [
        player.name,
        player.media,
        player.team,
        JSON.stringify(player.comment_team),
        JSON.stringify(player.comment_player),
        player.player_average,
      ],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        const playerId = this.lastID; // obtenir l'ID du dernier joueur inséré
        console.log(`Player inserted, ID ${playerId}`);
      }
    );
  });

  const playes_matches = [
    {
      goals: 3,
      assists: 1,
      shoots: 10,
      average: 3.5,
      player_id: 1,
      match_id: 1,
    },
    {
      goals: 3,
      assists: 1,
      shoots: 10,
      average: 3.5,
      player_id: 2,
      match_id: 1,
    },
    {
      goals: 3,
      assists: 1,
      shoots: 10,
      average: 3.5,
      player_id: 3,
      match_id: 1,
    },
    {
      goals: 3,
      assists: 1,
      shoots: 10,
      average: 3.5,
      player_id: 4,
      match_id: 1,
    },
    {
      goals: 3,
      assists: 1,
      shoots: 10,
      average: 3.5,
      player_id: 5,
      match_id: 1,
    },
  ];

  const insertPlayerMatchSql = `
  INSERT INTO players_matches(goals, assists, shoots, average, player_id, match_id)
  VALUES(?, ?, ?, ?, ?, ?)
`;

  playes_matches.forEach((player_match) => {
    db.run(
      insertPlayerMatchSql,
      [
        player_match.goals,
        player_match.assists,
        player_match.shoots,
        player_match.average,
        player_match.player_id,
        player_match.match_id,
      ],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        const playerMatchId = this.lastID; // obtenir l'ID du dernier joueur inséré
        console.log(`Player Match inserted, ID ${playerMatchId}`);
      }
    );
  });


  // Close the database connection after all insertions are done
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection.");
  });
});
