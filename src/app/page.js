// app/page.js
"use client"; // This is a client component 👈🏽
import MatchList from "@/components/MatchList";
import PlayerList from "@/components/PlayerList";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api", {
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

  console.log(datas);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="bg"></div>
      <div className="z-20 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <code className="font-mono font-bold">My Stats</code>
        </p>
        <div className="fixed h-10 left-0 bottom-0 flex w-full justify-center align-middle border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <a
            className="pointer-events-none flex place-items-center lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mise à jour le 28/11/2023
            {/* <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            /> */}
          </a>
        </div>
      </div>

      <div className="z-10 home__content flex flex-col gap-3 text-center">
        <h2 className="text-4xl">Liste des matchs</h2>
        <div className="matches__container">
          <MatchList matches={datas.matches} />
        </div>
      </div>

      <div className="z-10 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left">
          <PlayerList players={datas.players} />
      </div>
    </main>
  );
}
