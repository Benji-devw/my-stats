"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StatsTable from "@/components/StatsTable";
// import { useRouter, usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';

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
      //FIXME: find a way to get the match_id from the params.id
      .then((data) => {
        // console.log(data.matches);
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
      <div className="z-20">
        <h1>Match Details</h1>
        <p>Match ID: {params.id}</p>
        <p>Match Date: {match.match_date}</p>
      </div>
      
      <div className="z-20">
      <h1>Players in this Match</h1>
      <StatsTable players={players} params={params} />

      {/* {players.map((player, id) => 
        <div key={id}>

          {JSON.parse(player.matchs).map((match, id) => 
          match.match_id == params.id &&
            <div key={id}>
              <StatsTable stats={JSON.parse(players)} />
              <p>Match ID: {match.match_id}</p>
              <p>Goals: {match.goals}</p>
            </div>
          )}
        </div>
      )} */}
    </div>

    </>
  );
};

export default MatchPage;
