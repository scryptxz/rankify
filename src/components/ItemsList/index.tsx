import { useEffect, useState } from "react";
import { count } from "../../utils/count";
import { PiCaretDownBold } from "react-icons/pi";
import YearButtons from "../YearButtons";

interface SpotifyPlaybackEvent {
  ts: string;
  username: string;
  platform: string;
  ms_played: number;
  conn_country: string;
  ip_addr_decrypted: string;
  user_agent_decrypted: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_album_name: string;
  spotify_track_uri: string;
  episode_name: string;
  episode_show_name: string;
  spotify_episode_uri: string;
  reason_start: string;
  reason_end: string;
  shuffle: boolean;
  skipped: boolean;
  offline: boolean;
  offline_timestamp: number;
  incognito_mode: boolean;
}
interface FileData {
  jsonData: SpotifyPlaybackEvent[];
  category: string;
}
export default function ItemsList(props: FileData) {
  const { jsonData, category } = props;

  const [items, setItems] = useState<string[]>([]);
  const [itemsAmount, setItemsAmount] = useState<number>(50);
  const [selectedYear, setSelectedYear] = useState(0);

  const progressBar = (firstValue: number, currentValue: number) => {
    const x: number = currentValue / firstValue;
    return x * 100;
  };

  useEffect(() => {
    const itemsNames: string[] = jsonData.map(
      (e) => (e as any)[category] || "Unknown Artist"
    );

    setItems(itemsNames);
  }, [jsonData, category]);

  const ranking = count(items, "itemName", "playCount");

  return (
    <ol className="relative flex flex-col w-full gap-6 px-5">
      <YearButtons
        jsonData={jsonData}
        setItems={setItems}
        category={category}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      {ranking.slice(0, itemsAmount).map((e, i) => (
        <div className="flex items-center gap-4 text-nowrap w-full" key={i}>
          <li className="relative w-full flex items-center justify-between gap-12 px-4 py-1 text-lightgreen rounded-full">
            <span
              className={`absolute left-0 top-0 h-[32px] bg-green rounded-full shadow-2xl`}
              style={{
                width: `${progressBar(ranking[0].playCount, e.playCount)}%`,
              }}></span>
            <div className="z-10 flex items-center gap-6">
              <span className="font-bold text-light">{i + 1}º - </span>
              <span className="">{e.itemName}</span>
            </div>
          </li>
          <span className="text-lightgreen">{e.playCount} times</span>
        </div>
      ))}
      <button
        onClick={() => {
          setItemsAmount(itemsAmount + 50);
        }}
        className="flex items-center self-center gap-2 text-lg text-lightgreen hover:underline">
        Show more <PiCaretDownBold />
      </button>
    </ol>
  );
}
