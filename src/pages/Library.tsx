// import axios from "axios";
import SpotifyData from "../utils/spotify_data.json";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import count from "count-array-values";
import isoWeek from "dayjs/plugin/isoWeek";

export default function Library() {
  interface SpotifyPlaybackEvent {
    ts: null | string;
    username: null | string;
    platform: null | string;
    ms_played: null | number;
    conn_country: null | string;
    ip_addr_decrypted: null | string;
    user_agent_decrypted: null | string;
    master_metadata_track_name: string;
    master_metadata_album_artist_name: string;
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
  const spotifyData: SpotifyPlaybackEvent[] = SpotifyData;

  const [artists, setArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [type, setType] = useState("artists");

  useEffect(() => {
    const names: string[] = [];
    spotifyData.forEach((e) => {
      names.push(e.master_metadata_album_artist_name);
    });
    setArtists(names);

    interface TrackNames {
      name: string;
      artist: string;
    }
    const tracksNames: string[] = [];
    spotifyData.forEach((e) => {
      tracksNames.push(e.master_metadata_track_name);
    });
    setTracks(tracksNames);
  }, [type]);

  dayjs.extend(isoWeek);

  const ranking = count(artists, "artistName", "playCount");

  const tracksRanking = count(tracks, "trackName", "playCount");

  console.log(tracksRanking);

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 p-10 bg-neutral-950">
      <div className="text-xl text-white">
        <button
          onClick={() => setType("artists")}
          className={`px-5 py-3 border border-gray-400 ${
            type === "artists" && "bg-gray-200 text-black"
          }`}>
          Top Artists
        </button>
        <button
          onClick={() => setType("tracks")}
          className={`px-5 py-3 border border-gray-400 ${
            type === "tracks" && "bg-gray-200 text-black"
          }`}>
          Top Tracks
        </button>
      </div>
      {type === "artists" ? (
        <div className="flex flex-col w-[60rem] gap-6">
          {ranking.slice(0).map((e, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-12 px-4 text-2xl text-white border border-purple-500 py-7">
              <div className="flex items-center gap-6">
                <span className="font-bold text-purple-500">{i + 1}º - </span>
                <span className="">{e.artistName}</span>
              </div>
              <span className="p-2 font-semibold text-purple-500">
                {e.playCount} times
              </span>
            </div>
          ))}
        </div>
      ) : (
        type === "tracks" && (
          <div className="flex flex-col gap-6 w-[60rem]">
            {tracksRanking.slice(0).map((e, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 text-2xl text-white border border-orange-500 py-7">
                <div className="flex items-center gap-6">
                  <span className="font-bold text-orange-500">{i + 1}º - </span>
                  <span className="w-[40rem]">{e.trackName}</span>
                </div>
                <span className="p-2 font-semibold text-orange-500">
                  {e.playCount} times
                </span>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
