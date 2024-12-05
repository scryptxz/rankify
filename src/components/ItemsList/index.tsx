import { useEffect, useState } from "react";
import { count } from "../../utils/count";
import { PiCaretDownBold } from "react-icons/pi";
import YearButtons from "../YearButtons";
import SearchItem from "../SearchItem";
// import MiniTrackPlayer from "../MiniTrackPlayer";

interface SpotifyPlaybackEvent {
  ts: string;
  username: string;
  platform: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_album_name: string;
  spotify_track_uri: string;
}
interface FileData {
  jsonData: SpotifyPlaybackEvent[];
  category: string;
}

interface RankingTypes {
  itemName: string;
  playCount: number;
  rank: string;
  trackID: string;
}

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
    return x * 100;
  };

  useEffect(() => {
    const filteredItemsByYear = jsonData.filter(
      (a) =>
        a.ts.includes(selectedYear.toString()) &&
        a.master_metadata_album_artist_name != null &&
        a.master_metadata_album_album_name != null &&
        a.master_metadata_track_name != null
    );

    type ItemsTypes = {
      item: string;
      trackID: string;
    };

    const items: ItemsTypes[] = filteredItemsByYear.map((e) => {
      if (category == "master_metadata_track_name") {
        return {
          item:
            (e as SpotifyPlaybackEvent)[category] +
            " - " +
            e["master_metadata_album_artist_name"],
          trackID: e["spotify_track_uri"],
        };
      } else {
        return { item: e[category as keyof SpotifyPlaybackEvent], trackID: "" };
      }
    });

    const rankingCount = count(items, "itemName", "playCount", "trackID").map(
      (e, i) => ({
        ...e,
        rank: i + 1,
      })
    );

    // console.log(rankingCount);

    const filteredItemsBySearch = rankingCount.filter((a) =>
      a.itemName
        .toLocaleLowerCase()
        .includes(searchItem.toLocaleLowerCase().trim())
    );

    setPlayCount(items.length);

    setRanking(filteredItemsBySearch);
  }, [jsonData, selectedYear, category, searchItem]);

  return (
    <ol className="relative flex flex-col w-full gap-6 px-5">
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

      <ul className="flex gap-12 justify-center text-lightgreen">
        <li>Play count: {new Intl.NumberFormat().format(playCount)}</li>
      </ul>

      {ranking.slice(0, itemsCount).map((e, i) => (
        <li
          className="flex items-center gap-4 whitespace-nowrap w-full"
          key={i}>
          <div className="relative w-full flex items-center justify-between gap-12 px-4 py-1 text-lightgreen rounded-full">
            <div
              className="absolute flex -left-2 transition-[width] duration-1000 ease-in-out"
              style={{
                width: `${progressBar(ranking[0].playCount, e.playCount)}%`,
              }}>
              <span
                className={`left-0 top-0 h-[32px] ${
                  itemsCount <= 50 ? "animate-progress" : "w-full"
                } bg-green rounded-full shadow-2xl`}></span>
            </div>
            <div className="z-10 flex items-center gap-6">
              <span className="font-bold text-light">{e.rank}º - </span>
              <span className="">
                {(() => {
                  const japaneseRegex =
                    /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
                  if (window.innerWidth < 550 && e.itemName.length > 35) {
                    if (window.innerWidth < 450 && e.itemName.length > 28) {
                      return e.itemName.slice(0, 28) + "...";
                    } else {
                      if (japaneseRegex.test(e.itemName)) {
                        return e.itemName.slice(0, 1) + "...";
                      } else {
                        return e.itemName.slice(0, 35) + "...";
                      }
                    }
                  } else {
                    return e.itemName;
                  }
                })()}
              </span>
            </div>
          </div>
          <span className="text-lightgreen font-semibold">
            {new Intl.NumberFormat().format(e.playCount)} times
          </span>
        </li>
      ))}
      {ranking.length > 50 && itemsCount < ranking.length && (
        <button
          onClick={() => {
            setItemsCount(itemsCount + 50);
          }}
          className="flex items-center self-center gap-2 text-lg font-semibold text-lightgreen hover:underline">
          Show more <PiCaretDownBold />
        </button>
      )}
    </ol>
  );
}
