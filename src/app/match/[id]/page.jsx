<<<<<<< HEAD
'use client';
import { useParams } from "next/navigation";

const Test = () => {
  const { id } = useParams();
  return <div>Match {id}</div>;
};

export default Test;
=======
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const MatchPage = () => {
  const router = useRouter();
  console.log(router);
  // const { id } = router.query;

  // Fetch match details using the id

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="bg"></div>
      <div className="z-20">

      <h1>Match Details</h1>
      {/* <p>Match ID: {id}</p> */}
      {/* Display other match details */}
      </div>
    </main>
  );
};

export default MatchPage;
>>>>>>> 0df37857c6fbea88a071bea18c56fbd3511490b0
