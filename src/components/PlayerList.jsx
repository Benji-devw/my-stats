// components/MatchList.tsx
import Image from "next/image";

const MatchList = ({ players }) => {
  if (!players) {
    return <p>No players available.</p>;
  }

  return (
    <>
      {players.map((player) => (
        <a
          key={player.player_id}
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          // target="_blank"
          rel="noopener noreferrer"
        >
          <h2
            className={`flex flex-row justify-center mb-3 text-2xl font-semibold`}
          >
            <Image
              src={player.media}
              alt={player.name}
              className="rounded-full"
              width={100}
              height={100}
              priority
            />
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-center`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>
      ))}
    </>
  );
};

export default MatchList;
