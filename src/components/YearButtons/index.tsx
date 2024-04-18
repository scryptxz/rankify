import { useState } from "react";

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

interface YearProps {
  setArtists: (value: string[]) => void;
  jsonData: SpotifyPlaybackEvent[];
}

export default function YearButtons(props: YearProps) {
  const { setArtists, jsonData } = props;

  const [selectedYear, setSelectedYear] = useState(0);

  const filterByYear = (year: string) => {
    const yearArtists = jsonData.filter((a) => a.ts.includes(year));

    const newArtistsNames: string[] = yearArtists.map(
      (e) => e.master_metadata_album_artist_name || "Unknown Artist"
    );
    setArtists(newArtistsNames);
  };

  const getYearOccurrences = () => {
    const firstYear: number = new Date(jsonData[0].ts).getFullYear();
    const lastYear: number = new Date(
      jsonData[jsonData.length - 1].ts
    ).getFullYear();
    const occurrences: number = lastYear - firstYear;

    return occurrences + 1;
  };

  return (
    <div className="flex w-full justify-center">
      {Array(getYearOccurrences())
        .fill("")
        .map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedYear(i);
              filterByYear((2024 - i).toString());
            }}
            className={`self-center px-8 py-2 text-lg border text-white ${
              selectedYear === i && "bg-white !text-black !border-white"
            } ${i === 0 && "rounded-l-full"}`}>
            {2024 - i}
          </button>
        ))}
      <button
        onClick={() => {
          setSelectedYear(999);
          filterByYear("");
        }}
        className={`self-center px-8 py-2 text-lg border text-white rounded-r-full ${
          selectedYear === 999 && "bg-white !text-black !border-white"
        }`}>
        All time
      </button>
    </div>
  );
}
