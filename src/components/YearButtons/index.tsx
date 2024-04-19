// import { useState } from "react";

import { useEffect, useState } from "react";

interface SpotifyPlaybackEvent {
  ts: string;
  username: string;
  platform: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_album_name: string;
  spotify_track_uri: string;
}

interface YearProps {
  setItems: (value: string[]) => void;
  jsonData: SpotifyPlaybackEvent[];
  category: string;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
}

export default function YearButtons(props: YearProps) {
  const { jsonData, selectedYear, setSelectedYear } = props;
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const years: string[] = [];

    jsonData.forEach((e) => {
      const year: string = new Date(e.ts).getFullYear().toString();
      if (!years.includes(year)) {
        years.push(year);
      }
    });

    setYears(years.reverse());
  }, [jsonData]);

  return (
    <nav className="flex flex-wrap w-full justify-center">
      {years.map((e, i) => (
        <button
          key={i}
          onClick={() => {
            setSelectedYear(e);
          }}
          className={`self-center px-8 py-2 text-lg border text-lightgreen duration-200 ease-in-out ${
            selectedYear === e && "bg-lightgreen !text-black !border-lightgreen"
          } ${i === 0 && "xl:rounded-l-full"}`}>
          {e}
        </button>
      ))}
      <button
        onClick={() => {
          setSelectedYear("0");
        }}
        className={`self-center px-8 py-2 text-lg border text-lightgreen xl:rounded-r-full duration-200 ease-in-out ${
          selectedYear === "0" && "bg-lightgreen !text-black !border-lightgreen"
        }`}>
        All time
      </button>
    </nav>
  );
}
