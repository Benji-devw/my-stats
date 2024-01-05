"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { useRouter, usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';

const PlayerPage = () => {
  const params = useParams();
  const [datas, setDatas] = useState([]);
  console.log(params);
  console.log(datas);

  useEffect(() => {
    fetch(`http://localhost:3000/api/player/${params.id}`, {
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
    <>
        <h2>Player Details</h2>
        {/* <p>Match ID: {id}</p> */}
        {/* Display other match details */}
    </>
  );
};

export default PlayerPage;
