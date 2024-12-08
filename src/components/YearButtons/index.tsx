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
  jsonData: SpotifyPlaybackEvent[];
  category: string;
  selectedYear: string;
  itemsCount: number;
  setSelectedYear: (value: string) => void;
  setItemsCount: (value: number) => void;
  setSearchItem: (value: string) => void;
}

export default function YearButtons(props: YearProps) {
  const {
    jsonData,
    selectedYear,
    itemsCount,
    setSelectedYear,
    setItemsCount,
    setSearchItem,
  } = props;
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const years: number[] = [];

    jsonData.forEach((e) => {
      const year: number = new Date(e.ts).getFullYear();
      if (!years.includes(year)) {
        years.push(year);
      }
    });

    setYears(years.sort((a: number, b: number) => b - a));
  }, [jsonData]);

  return (
    <nav className="flex flex-wrap w-full justify-center">
      {years.map((e, i) => (
        <button
          key={i}
          onClick={() => {
            setSelectedYear(e.toString());
            setItemsCount(itemsCount);
            setSearchItem("");
          }}
          className={`self-center px-8 py-2  font-semibold border text-lightgreen duration-200 ease-in-out border-lightgreen ${
            selectedYear === e.toString()
              ? "bg-lightgreen !text-black !border-lightgreen"
              : "hover:bg-lightgreen hover:bg-opacity-15"
          } ${i === 0 && "lg:rounded-l-full"}`}>
          {e}
        </button>
      ))}
      <button
        onClick={() => {
          setSelectedYear("all time");
          setItemsCount(itemsCount);
          setSearchItem("");
        }}
        className={`self-center px-8 py-2  border border-lightgreen text-lightgreen lg:rounded-r-full duration-200 ease-in-out font-semibold ${
          selectedYear === "all time"
            ? "bg-lightgreen !text-black !border-lightgreen"
            : "hover:bg-lightgreen hover:bg-opacity-15"
        }`}>
        All time
      </button>
    </nav>
  );
}
