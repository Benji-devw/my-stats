// components/MatchList.tsx
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MatchList = ({ matches }) => {
  if (!matches) {
    return <p>No matches available.</p>;
  }

  return (
    <>
      {matches.map((match) => (
    <Link href={`/match/${match.match_id}`}>
        <div
          key={match.match_id}
          className="card border-b border-orange-700 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-orange-700 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          <h3>{`${match.team1_name} - ${match.team2_name}`}</h3>
          <p>{`${match.team1_score} - ${match.team2_score}`}</p>
        </div>
    </Link>
      ))}
    </>
  );
};

export default MatchList;
