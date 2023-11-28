// components/MatchList.tsx

import React, { useEffect, useState } from "react";
import FetchMatches from "../api/matches";

const MatchList = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await FetchMatches();
        setDatas(response.datas);
      } catch (error) {
        alert("Erreur lors de la récupération des données de l'article");
        console.error(
          "Erreur lors de la récupération des données de l'article:",
          error
        );
      }
    };
    fetchMatches();
  }, []);

  console.log(datas);

  return (
    <>
      {datas.map((match) => (
        <div key={match.id} className="card border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <h3>{`${match.team1} vs. ${match.team2}`}</h3>
          <p>Score: {`${match.score1} - ${match.score2}`}</p>
        </div>
      ))}
    </>
  );
};

export default MatchList;
