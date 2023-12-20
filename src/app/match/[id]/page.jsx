"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { useRouter, usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';

const MatchPage = () => {
  const params = useParams();
  const [datas, setDatas] = useState([]);
  console.log(params);
  console.log(datas);

  useEffect(() => {
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
      .then((data) => setDatas(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

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
