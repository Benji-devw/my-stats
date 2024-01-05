"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StatsTable from "@/components/StatsTable";
import CardMatch from "@/components/MatchCard";

const MatchPage = () => {
  const params = useParams();
  const [match, setMatch] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/api/match/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);

        // Create the match object
        const matchData = {
          match_id: data[0].match_id,
          media_video: data[0].media_video,
          team1_name: data[0].team1_name,
          team2_name: data[0].team2_name,
          team1_score: data[0].team1_score,
          team2_score: data[0].team2_score,
          match_average: data[0].match_average,
          players: [],
        };

        // Add players to the match object
        for (const player of data) {
          matchData.players.push({
            player_id: player.player_id,
            name: player.name,
            media: player.media,
            team: player.team,
            comment_team: player.comment_team,
            comment_player: player.comment_player,
            player_average: player.player_average,
            player_match_id: player.player_match_id,
            goals: player.goals,
            assists: player.assists,
            shoots: player.shoots,
            average: player.average,
            coach_comment: player.coach_comment,
            player_comment: player.player_comment,
          });
        }

        // Définissez les données du match
        setMatch(matchData);
      })

      .catch((error) => {
        setError(`Fetch error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  console.log(match);
  return (
    <>
      {loading ? (
        <h2 className="">Loading...</h2>
      ) : error ? (
        <h2 className="">Error: {error}</h2>
      ) : (
        <>
          <h2>Match {params.id}</h2>

          <CardMatch match={match} params={params} />

          <div className="p-2 mb-4">
            <StatsTable players={match.players} params={params} />
          </div>
        </>
      )}
    </>
  );
};

export default MatchPage;
