"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StatsTable from "@/components/StatsTable";
import CardMatch from "@/components/MatchCard";

const MatchPage = () => {
  const params = useParams();
  const [match, setMatch] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api`, {
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
        const match = data.matches.find((match) => match.match_id == params.id);
        // const players = data.players.filter((player) => player.match.match_id == params.id);
        setMatch(match);
        setPlayers(data.players);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [params.id]);

  // console.log(players);
  return (
    <>
      <CardMatch match={match} params={params} />

      <div className="z-20">
        {/* <h1>Players in this Match</h1> */}
        <StatsTable players={players} params={params} />
      </div>
    </>
  );
};

export default MatchPage;
