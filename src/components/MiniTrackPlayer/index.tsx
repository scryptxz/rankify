import axios from "axios";
import { useEffect, useState } from "react";
import qs from "qs";
import { PiPlayBold } from "react-icons/pi";

interface MiniTrackPlayerProps {
  TrackID: string;
  category: string;
  selectedYear: string;
}

interface TrackTypes {
  preview_url: string;
}

export default function MiniTrackPlayer(props: MiniTrackPlayerProps) {
  const { TrackID, category, selectedYear } = props;

  const [trackURL, setTrackURL] = useState<TrackTypes>({ preview_url: "" });

  useEffect(() => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify({
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
        })
      )
      .then((res) => {
        console.log(`https://api.spotify.com/v1/tracks/${TrackID}`);

        axios
          .get(`https://api.spotify.com/v1/tracks/${TrackID}`, {
            headers: {
              Authorization: `Bearer ${res.data.access_token}`,
            },
          })
          .then((res) => {
            setTrackURL({
              preview_url: res.data.preview_url,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [category, selectedYear, TrackID]);

  const playTrack = () => {
    const audio = new Audio(trackURL.preview_url);
    audio.play();
  };

  return (
    <button onClick={playTrack} className="absolute z-10 top-[6px] left-2">
      <PiPlayBold size={20} />
    </button>
  );
}
