import { useEffect, useState } from "react";
import count from "count-array-values";
import SpotifyData1 from "../../data/sd1.json";
import SpotifyData2 from "../../data/sd2.json";
import SpotifyData3 from "../../data/sd4.json";
import SpotifyData4 from "../../data/sd3.json";
import { PiCaretDownBold } from "react-icons/pi";

export default function TracksList() {
  interface SpotifyPlaybackEvent {
    ts: null | string;
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

  const spotifyData: SpotifyPlaybackEvent[] = [...SpotifyData1, ...SpotifyData2, ...SpotifyData3, ...SpotifyData4];

  const [tracks, setTracks] = useState<any[]>([]);
  const [tracksNumbers, setTracksNumbers] = useState<number>(50);

  useEffect(() => {
    const tracksNames: string[] = [];
    spotifyData.forEach((e) => {
      tracksNames.push(e.master_metadata_track_name || "Unknown Track");
    });
    setTracks(tracksNames);
  }, []);

  const progressBar = (firstValue: number, currentValue: number) => {
    const x: number = (currentValue * 880) / firstValue;
    return x;
  };

  const ranking = count(tracks, "trackName", "playCount");

  return (
    <div className="flex flex-col w-full gap-6">
      {ranking.slice(0, tracksNumbers).map((e, i) => (
        <div
          key={i}
          className="relative flex items-center justify-between gap-12 px-4 py-3 text-xl text-white border-[#E54173]">
          <div
            className={`absolute left-0 top-0 h-[70px] bg-[rgba(229,65,114,0.6)] rounded-full shadow-2xl`}
            style={{
              width: progressBar(ranking[0].playCount, e.playCount),
            }}></div>
          <div className="z-10 flex items-center gap-6">
            <span className="font-bold text-[#ff9ebc]">{i + 1}º - </span>
            <span>{e.trackName}</span>
          </div>
          <span className="z-10 p-2 font-bold text-white">
            {e.playCount} times
          </span>
        </div>
      ))}
      <button
        onClick={() => {
          setTracksNumbers(tracksNumbers + 50);
        }}
        className="flex items-center self-center gap-2 text-xl text-neutral-300 hover:underline">
        Show more <PiCaretDownBold />
      </button>
    </div>
  );
}
