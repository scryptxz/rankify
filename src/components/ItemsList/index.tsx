import { useEffect, useState } from "react";
import { count } from "../../utils/count";
import { PiCaretDownBold } from "react-icons/pi";
import YearButtons from "../YearButtons";
import SearchItem from "../SearchItem";
// import MiniTrackPlayer from "../MiniTrackPlayer";

type SpotifyPlaybackEvent = {
  ts: string;
  username: string;
  platform: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_album_name: string;
  spotify_track_uri: string;
};
type FileData = {
  jsonData: SpotifyPlaybackEvent[];
  category: string;
};

type RankingTypes = {
  rank: number;
  itemName: string;
  playCount: number;
  trackID: string;
};

type ItemsTypes = {
  item: string;
  trackID: string;
};

export default function ItemsList(props: FileData) {
  const { jsonData, category } = props;

  const [itemsCount, setItemsCount] = useState<number>(50);
  const [playCount, setPlayCount] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const [ranking, setRanking] = useState<RankingTypes[]>([]);

  const lastYear: string = new Date(jsonData[jsonData.length - 1].ts)
    .getFullYear()
    .toString();
  const [selectedYear, setSelectedYear] = useState<string>(lastYear);

  const progressBar = (firstValue: number, currentValue: number) => {
    const x: number = currentValue / firstValue;
    return x * 91;
  };

  useEffect(() => {
    const filteredItemsByYear = jsonData.filter(
      (a) =>
        a.ts.includes(selectedYear.toString()) &&
        a.master_metadata_album_artist_name != null &&
        a.master_metadata_album_album_name != null &&
        a.master_metadata_track_name != null
    );

    const items: ItemsTypes[] = filteredItemsByYear.map((e) => {
      if (
        category === "master_metadata_track_name" ||
        category === "master_metadata_album_album_name"
      ) {
        return {
          item:
            (e as SpotifyPlaybackEvent)[category] +
            " - " +
            e["master_metadata_album_artist_name"],
          trackID: e["spotify_track_uri"],
        };
      }
      return { item: e[category as keyof SpotifyPlaybackEvent], trackID: "" };
    });

    const rankingCount: RankingTypes[] = count(items).map((e, i) => ({
      ...e,
      rank: i + 1,
    }));

    const filteredItemsBySearch: RankingTypes[] = rankingCount.filter((a) =>
      a.itemName
        .toLocaleLowerCase()
        .includes(searchItem.toLocaleLowerCase().trim())
    );

    setPlayCount(items.length);

    setRanking(filteredItemsBySearch);
  }, [jsonData, selectedYear, category, searchItem]);

  return (
    <div className="relative flex flex-col w-full gap-6 px-5">
      <YearButtons
        jsonData={jsonData}
        category={category}
        selectedYear={selectedYear}
        itemsCount={itemsCount}
        setSelectedYear={setSelectedYear}
        setItemsCount={setItemsCount}
        setSearchItem={setSearchItem}
      />
      <SearchItem
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        category={category}
      />

      <ul className="flex flex-col items-center gap-8 justify-between text-lightgreen">
        <li>Play count: {new Intl.NumberFormat().format(playCount)}</li>
        {ranking.slice(0, itemsCount).map((e, i) => (
          <li className="flex items-center whitespace-nowrap w-full" key={i}>
            <div
              className="absolute flex -left-2 transition-[width] duration-1000 ease-in-out"
              style={{
                width: `${progressBar(ranking[0].playCount, e.playCount)}%`,
              }}>
              <span
                className={`left-0 top-0 h-[40px] ${
                  itemsCount <= 50 ? "animate-progress" : "w-full"
                } bg-green rounded-full shadow-2xl bg-opacity-50`}></span>
            </div>
            <div className="z-10 flex items-center gap-3">
              <span className="font-bold text-light w-8">{e.rank}º </span>
              <span className="overflow-x-hidden text-ellipsis">
                {e.itemName}
              </span>
            </div>
            <span className="text-lightgreen font-semibold z-20 text-end absolute right-0">
              {new Intl.NumberFormat().format(e.playCount)} times
            </span>
          </li>
        ))}
      </ul>

      {ranking.length > 50 && itemsCount < ranking.length && (
        <button
          onClick={() => {
            setItemsCount(itemsCount + 50);
          }}
          className="flex items-center self-center gap-2 text-lg font-semibold text-lightgreen hover:underline">
          Show more <PiCaretDownBold />
        </button>
      )}
    </div>
  );
}
