import "../app/styles/cardMatch.css";

const CardMatch = ({ match }) => {
  return (
    <div className="z-20 card-match">
      <h3>{`${match.team1_name} - ${match.team2_name}`}</h3>
      <p>
        <b
          className={match.team1_score > match.team2_score ? "text-colo" : ""}
        >{`${match.team1_score}`}</b>{" "}
        - <span>{`${match.team2_score}`}</span>
      </p>
      {/* <a href="#" target="_blank" rel="noopener noreferrer">
            Voir le match sur NGTV
          </a> */}
      <p>{`${match.match_id}`}</p>
    </div>
  );
};

export default CardMatch;
