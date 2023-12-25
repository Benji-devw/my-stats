import Image from "next/image";
import React from "react";
import "@/app/styles/statsTable.css";

const StatsTable = ({ players }) => {
  console.log(players);
  return (
    <table>
      <thead>
        <tr>
          <th>Joueur</th>
          <th>But</th>
          <th>Tir</th>
          <th>Passe D</th>
          <th>Moyenne</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={index}>
            <td>
              <Image
                src={player.media}
                alt={player.name}
                className="player__list__image rounded-full"
                width={100}
                height={100}
                priority
              />
            </td>
            <td>{player.goals}</td>
            <td>{player.shoots}</td>
            <td>{player.assists}</td>
            <td>{player.average}/10</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatsTable;
