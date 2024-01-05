// app/page.js
"use client"; // This is a client component 👈🏽
import MatchList from "@/components/MatchList";
import PlayerList from "@/components/PlayerList";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [datas, setDatas] = useState([]);

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
      .then((data) => setDatas(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  // console.log(datas);
  return (
    <>
      <div className="home__content flex flex-col gap-3 text-center">
        <h2>Liste des matchs</h2>

        <Link href={`/match/create/`} className="btn btn-primary">Ajouter un match</Link>

        <div className="matches__container">
          <MatchList matches={datas.matches} />
        </div>
      </div>

      <div className="">
        <PlayerList players={datas.players} />
      </div>
    </>
  );
}
