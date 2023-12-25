// components/MatchList.tsx
import Link from "next/link";
import CardMatch from "@/components/MatchCard";
import "@/app/styles/cardMatch.css";

const MatchList = ({ matches }) => {
  if (!matches) {
    return <p>No matches available.</p>;
  }
  
  // console.log(matches);
  return (
    <div className="matches__list">
      {matches.map((match) => (
        <Link
          key={match.match_id}
          href={`/match/${match.match_id}`}
          className="card bg-gradient-to-b"
          rel="noopener noreferrer"
        >
          <CardMatch match={match} />
        </Link>
      ))}
    </div>
  );
};

export default MatchList;
