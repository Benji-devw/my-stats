// components/MatchList.tsx

import React, { useEffect, useState } from "react";
// import FetchMatches from "../app/api/route";

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the request headers to indicate JSON format
      },
    })
      .then((res) => res.json()) // Parse the response data as JSON
      .then((data) => setMatches(data)); // Update the state with the fetched data
  }, []);

  console.log(matches);

  return (
    <>
      {matches.map((match) => (
        <div key={match.id} className="card border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {/* <h3>{`${match.team1} vs. ${match.team2}`}</h3> */}
          <p>Score: {`${match.score1} - ${match.score2}`}</p>
        </div>
      ))}
    </>
  );
};

export default MatchList;
