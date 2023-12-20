"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
        // console.log(typeof data);
        const entriesArray = Object.entries(data);
        console.log(entriesArray);
        const match = entriesArray.find((match) => match[1].match_id === params.id);
        setMatch(match[1]);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [params.id]);
  

  // console.log(match);
  return (
    <>
      <div className="z-20">
        <h1>Match Details</h1>
        <p>Match ID: {params.id}</p>
        <p>Match Date: {match.match_date}</p>
      </div>
      
      {/* <div className="z-20">
        <h1>Players in this Match</h1>
        {datas.player && datas.match && (
          <div>
            <p>Player ID: {datas.player.player_id}</p>
            <p>Player Name: {datas.player.name}</p>
            <p>Match ID: {datas.match.match_id}</p>
          </div>
        )}
      </div> */}
    </>
  );
};

export default MatchPage;
