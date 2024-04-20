import { useEffect, useState } from "react";
import { count } from "../../utils/count";
import { PiCaretDownBold } from "react-icons/pi";
import YearButtons from "../YearButtons";
import SearchItem from "../SearchItem";

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
export default function ItemsList(props: FileData) {
  const { jsonData, category } = props;

  const [items, setItems] = useState<string[]>([]);
  const [itemsCount, setItemsCount] = useState<number>(50);
  const [playCount, setPlayCount] = useState(0);
  const [searchItem, setSearchItem] = useState("");

  const lastYear: string = new Date(jsonData[jsonData.length - 1].ts)
    .getFullYear()
    .toString();
  const [selectedYear, setSelectedYear] = useState<string>(lastYear);

  const progressBar = (firstValue: number, currentValue: number) => {
    const x: number = currentValue / firstValue;
    return x * 100;
  };

  useEffect(() => {
    const filteredItemsByYear = jsonData.filter((a) =>
      a.ts.includes(selectedYear.toString())
    );

    const filteredItemsBySearch = filteredItemsByYear.filter((a) => {
      switch (category) {
        case "master_metadata_track_name":
          return (
            a.master_metadata_track_name != null &&
            a.master_metadata_track_name
              .toLocaleLowerCase()
              .includes(searchItem.toLocaleLowerCase().trim())
          );
        case "master_metadata_album_album_name":
          return (
            a.master_metadata_album_album_name != null &&
            a.master_metadata_album_album_name
              .toLocaleLowerCase()
              .includes(searchItem.toLocaleLowerCase().trim())
          );
        default:
          return (
            a.master_metadata_album_artist_name != null &&
            a.master_metadata_album_artist_name
              .toLocaleLowerCase()
              .includes(searchItem.toLocaleLowerCase().trim())
          );
      }
    });

    const items: string[] = filteredItemsBySearch.map((e) => {
      if (
        category === "master_metadata_track_name" ||
        category === "master_metadata_album_album_name"
      ) {
        return (
          ((e as SpotifyPlaybackEvent)[category] || "Unknown") +
          " - " +
          e["master_metadata_album_artist_name"]
        );
      } else {
        return (e as any)[category] || "Unknown";
      }
    });

    setItems(items);
    setPlayCount(items.length);
  }, [jsonData, category, selectedYear, searchItem]);

  const ranking = count(items, "itemName", "playCount");

  return (
    <ol className="relative flex flex-col w-full gap-6 px-5">
      <YearButtons
        jsonData={jsonData}
        setItems={setItems}
        category={category}
        selectedYear={selectedYear}
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
        <li className="flex items-center gap-4 text-nowrap w-full" key={i}>
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
              <span className="font-bold text-light">{i + 1}º - </span>
              <canvas className="">
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
              </canvas>
            </div>
          </div>
          <span className="text-lightgreen">
            {new Intl.NumberFormat().format(e.playCount)} times
          </span>
        </li>
      ))}
      <button
        onClick={() => {
          setItemsCount(itemsCount + 50);
        }}
        className="flex items-center self-center gap-2 text-lg text-lightgreen hover:underline">
        Show more <PiCaretDownBold />
      </button>
    </ol>
  );
}
