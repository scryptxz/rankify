interface ButtonsProps {
  type: string;
  setType: (value: string) => void;
}

export default function Button(props: ButtonsProps) {
  const { type, setType } = props;
  return (
    <div className="text-xl text-white">
      <button
        onClick={() => setType("artists")}
        className={`px-5 py-3 border border-white rounded-l-full ${
          type === "artists" && "bg-white text-black"
        }`}>
        Top Artists
      </button>
      <button
        onClick={() => setType("albums")}
        className={`px-5 py-3 border border-white ${
          type === "albums" && "bg-white text-black"
        }`}>
        Top Albums
      </button>
      <button
        onClick={() => setType("tracks")}
        className={`px-5 py-3 border border-white rounded-r-full ${
          type === "tracks" && "bg-white text-black"
        }`}>
        Top Tracks
      </button>
    </div>
  );
}
