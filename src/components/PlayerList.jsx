// components/MatchList.tsx
import Image from "next/image";
import Link from "next/link";

const MatchList = ({ players }) => {
  if (!players) {
    return <p>No players available.</p>;
  }

  return (
    <div className="player__list z-10 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left">
      {players.map((player) => (
        <Link
          key={player.player_id}
          href={`/player/${player.player_id}`}
          className="player__list__link group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          // target="_blank"
          rel="noopener noreferrer"
        >
          <h2
            className={`player__list__item flex flex-row justify-center mb-3 text-2xl font-semibold`}
          >
            <Image
              src={player.media}
              alt={player.name}
              className="player__list__image rounded-full"
              width={100}
              height={100}
              priority
            />
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-center`}>
            Find in-depth information about Next.js features and API.
          </p>
        </Link>
      ))}
    </div>
  );
};

export default MatchList;
