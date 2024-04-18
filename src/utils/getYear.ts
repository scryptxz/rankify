interface SpotifyPlaybackEvent {
  ts: string;
}

export function getYear(arr: SpotifyPlaybackEvent[], year: string) {
  const newArr = arr.filter((a) => a.ts.includes(year));
  return newArr;
}
