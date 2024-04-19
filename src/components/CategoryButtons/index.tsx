interface ButtonsProps {
  category: string;
  setCategory: (value: string) => void;
}

export default function CategoryButtons(props: ButtonsProps) {
  const { category, setCategory } = props;
  return (
    <nav className="text-lg text-lightgreen flex flex-wrap justify-center">
      <button
        onClick={() => setCategory("master_metadata_album_artist_name")}
        className={`px-5 py-2 border border-lightgreen rounded-l-full duration-200 ease-in-out ${
          category === "master_metadata_album_artist_name" &&
          "bg-lightgreen text-black"
        }`}>
        Top Artists
      </button>
      <button
        onClick={() => setCategory("master_metadata_album_album_name")}
        className={`px-5 py-2 border border-lightgreen duration-200 ease-in-out ${
          category === "master_metadata_album_album_name" &&
          "bg-lightgreen text-black"
        }`}>
        Top Albums
      </button>
      <button
        onClick={() => setCategory("master_metadata_track_name")}
        className={`px-5 py-2 border border-lightgreen rounded-r-full duration-200 ease-in-out ${
          category === "master_metadata_track_name" &&
          "bg-lightgreen text-black"
        }`}>
        Top Tracks
      </button>
    </nav>
  );
}
