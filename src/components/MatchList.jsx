// components/MatchList.tsx
import Link from "next/link";
// import React, { useEffect, useState } from "react";

const MatchList = ({ matches }) => {
  if (!matches) {
    return <p>No matches available.</p>;
  }
  // console.log(matches);

  return (
    <div className="matches__list">
      {matches.map((match) => (
        <Link
          key={match.match_id}
          href={`/match/${match.match_id}`}
          className="card border-b border-orange-700 bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl dark:border-orange-700 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4 lg:dark:bg-zinc-800/30"
          rel="noopener noreferrer"
        >
          <h3>{`${match.team1_name} - ${match.team2_name}`}</h3>
          <p>
            <span
              className={
                match.team1_score > match.team2_score ? "text-colo" : ""
              }
            >{`${match.team1_score}`}</span>{" "}
            - <span>{`${match.team2_score}`}</span>
          </p>
          {/* <a href="#" target="_blank" rel="noopener noreferrer">
            Voir le match sur NGTV
          </a> */}
          <p>{`${match.match_id}`}</p>
        </Link>
      ))}
    </div>
  );
};

export default MatchList;
