import Image from "next/image";
import React from "react";
import "@/app/styles/statsTable.css";

const StatsTable = ({ players, params }) => {
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
        {players.map((stat, index) => (
          <tr key={index}>
            <td>
              <Image
                src={stat.media}
                alt={stat.name}
                className="player__list__image rounded-full"
                width={100}
                height={100}
                priority
              />
            </td>
            {JSON.parse(stat.matchs).map((match, id) =>
              match.match_id == params.id && (
                <React.Fragment key={id}>
                  <td>{match.goals}</td>
                  <td>{match.shoot}</td>
                  <td>{match.pass_d}</td>
                  <td>{match.average}/10</td>
                </React.Fragment>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatsTable;
