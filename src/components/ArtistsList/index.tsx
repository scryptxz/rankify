import { useEffect, useState } from "react";
import { count } from "../../utils/count";
import { PiCaretDownBold } from "react-icons/pi";
import YearButtons from "../YearButtons";

interface SpotifyPlaybackEvent {
  ts: string;
  username: null | string;
  platform: null | string;
  ms_played: null | number;
  conn_country: null | string;
  ip_addr_decrypted: null | string;
  user_agent_decrypted: null | string;
  master_metadata_track_name: null | string;
  master_metadata_album_artist_name: null | string;
  master_metadata_album_album_name: null | string;
  spotify_track_uri: null | string;
  episode_name: null | string;
  episode_show_name: null | string;
  spotify_episode_uri: null | string;
  reason_start: null | string;
  reason_end: null | string;
  shuffle: null | boolean;
  skipped: null | boolean;
  offline: null | boolean;
  offline_timestamp: null | number;
  incognito_mode: null | boolean;
}
interface FileData {
  jsonData: SpotifyPlaybackEvent[];
}
export default function ArtistsList(props: FileData) {
  const { jsonData } = props;

  const [artists, setArtists] = useState<string[]>([]);
  const [artistsNumbers, setArtistsNumbers] = useState<number>(50);

  const progressBar = (firstValue: number, currentValue: number) => {
    const x: number = currentValue / firstValue;
    return x * 100;
  };

  useEffect(() => {
    const artistsNames: string[] = jsonData.map(
      (e) => e.master_metadata_album_artist_name || "Unknown Artist"
    );

    setArtists(artistsNames);
  }, [jsonData]);

  const ranking = count(artists, "artistName", "playCount");

  return (
    <ol className="relative flex flex-col w-full gap-6 px-5">
      <YearButtons jsonData={jsonData} setArtists={setArtists} />

      {ranking.slice(0, artistsNumbers).map((e, i) => (
        <div className="flex items-center gap-4 text-nowrap w-full" key={i}>
          <li className="relative w-full flex items-center justify-between gap-12 px-4 py-1 border-2 border-white text-white rounded-full ">
            <span
              className={`absolute left-0 top-0 h-[32px] bg-green rounded-full shadow-2xl`}
              style={{
                width: `${progressBar(ranking[0].playCount, e.playCount)}%`,
              }}></span>
            <div className="z-10 flex items-center gap-6">
              <span className="font-bold text-blue-400">{i + 1}º - </span>
              <span className="">{e.artistName}</span>
            </div>
          </li>
          <span className="text-white">{e.playCount} times</span>
        </div>
      ))}
      <button
        onClick={() => {
          setArtistsNumbers(artistsNumbers + 50);
        }}
        className="flex items-center self-center gap-2 text-lg text-white hover:underline">
        Show more <PiCaretDownBold />
      </button>
    </ol>
  );
}
