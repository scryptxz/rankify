interface SearchItem {
  setSearchItem: (value: string) => void;
  category: string;
}

export default function SearchItem(props: SearchItem) {
  const { setSearchItem, category } = props;

  return (
    <input
      onChange={(e) => setSearchItem(e.target.value)}
      type="text"
      autoFocus
      maxLength={200}
      className="px-5 py-2 text-lightgreen border border-lightgreen rounded-3xl bg-primary placeholder:text-[rgb(218,255,214,0.6)]"
      placeholder={`Search ${
        category === "master_metadata_album_artist_name"
          ? "artist"
          : category === "master_metadata_album_album_name"
          ? "album"
          : "track"
      }`}
    />
  );
}
