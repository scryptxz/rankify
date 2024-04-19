// import { useState } from "react";

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

interface YearProps {
  setItems: (value: string[]) => void;
  jsonData: SpotifyPlaybackEvent[];
  category: string;
  selectedYear: number;
  setSelectedYear: (value: number) => void;
}

export default function YearButtons(props: YearProps) {
  const { setItems, jsonData, category, selectedYear, setSelectedYear } = props;

  const filterByYear = (year: string) => {
    const filteredItems = jsonData.filter((a) => a.ts.includes(year));

    const newItems: string[] = filteredItems.map(
      (e) => (e as any)[category] || "Unknown Artist"
    );
    setItems(newItems);
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
            className={`self-center px-8 py-2 text-lg border text-lightgreen duration-200 ease-in-out ${
              selectedYear === i &&
              "bg-lightgreen !text-black !border-lightgreen"
            } ${i === 0 && "rounded-l-full"}`}>
            {2024 - i}
          </button>
        ))}
      <button
        onClick={() => {
          setSelectedYear(999);
          filterByYear("");
        }}
        className={`self-center px-8 py-2 text-lg border text-lightgreen rounded-r-full duration-200 ease-in-out ${
          selectedYear === 999 && "bg-lightgreen !text-black !border-lightgreen"
        }`}>
        All time
      </button>
    </div>
  );
}
