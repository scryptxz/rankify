// import axios from "axios";
import SpotifyData from "../utils/spotify_data.json";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { PiCaretDownBold } from "react-icons/pi";

export default function Library() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [type, setType] = useState("artists");
  const [tracksNumbers, setTracksNumbers] = useState<number>(50);

  useEffect(() => {
    const names: string[] = [];
    spotifyData.forEach((e) => {
      names.push(e.master_metadata_album_artist_name);
    });
    setArtists(names);
  }, [type]);

  dayjs.extend(isoWeek);

  const tracksRanking = count(tracks, "trackName", "playCount");

  const progressBar = (firstValue: number, currentValue: number) => {
    const x: number = (currentValue * 880) / firstValue;
    return x;
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="flex flex-col items-center m-auto gap-6 p-10 w-[60rem]">
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
        <input
          type="text"
          className="w-full p-4 text-xl text-white bg-black border border-neutral-400 placeholder:text-neutral-400 focus:border-white"
          placeholder="Search track/artists"
        />
        {type === "artists" ? (
          <div className="flex flex-col w-full gap-6">
            {ranking.slice(0, artistsNumbers).map((e, i) => (
              <>
                <div
                  key={i}
                  className="relative flex items-center justify-between gap-12 px-4 py-3 text-xl text-white border border-purple-500">
                  <div
                    className={`absolute left-0 top-0 h-[70px] bg-[rgba(248,43,255,0.08)]`}
                    style={{
                      width: progressBar(ranking[0].playCount, e.playCount),
                    }}></div>
                  <div className="z-10 flex items-center gap-6">
                    <span className="font-bold text-purple-500">
                      {i + 1}º -{" "}
                    </span>
                    <span className="">{e.artistName}</span>
                  </div>
                  <span className="z-10 p-2 font-semibold text-purple-500">
                    {e.playCount} times
                  </span>
                </div>
              </>
            ))}
            <button
              onClick={() => {
                setArtistsNumbers(artistsNumbers + 50);
              }}
              className="flex items-center self-center gap-2 text-xl text-neutral-300 hover:underline">
              Show more <PiCaretDownBold />
            </button>
          </div>
        ) : (
          type === "tracks" && (
            <div className="flex flex-col w-full gap-6">
              {tracksRanking.slice(0).map((e, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 text-2xl text-white border border-orange-500 py-7">
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-orange-500">
                      {i + 1}º -{" "}
                    </span>
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
    </div>
  );
}
