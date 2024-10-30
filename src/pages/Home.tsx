// import axios from "axios";
import { useState } from "react";
import ItemsList from "../components/ItemsList";
import CategoryButtons from "../components/CategoryButtons";
import Logo from "../assets/imgs/logos/rankify-logo-green.png";
import FileUpload from "../components/FileUpload";
import { RaceBy } from "@uiball/loaders";
import Footer from "../components/Footer";

interface SpotifyPlaybackEvent {
  ts: string;
  username: string;
  platform: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_album_name: string;
  spotify_track_uri: string;
}

export default function Home() {
  const [inputFile, setInputFile] = useState<SpotifyPlaybackEvent[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [category, setCategory] = useState("master_metadata_album_artist_name");

  return (
    <>
      <main className="min-h-screen pt-8 pb-20 bg-primary !font-mono font-semibold">
        <section className="flex flex-col items-center m-auto gap-8 max-w-[60rem]">
          <img src={Logo} alt="Rankify logo" width={200} />
          <FileUpload
            inputFile={inputFile}
            setInputFile={setInputFile}
            setLoading={setLoading}
          />
          {loading && <RaceBy size={150} color="#DAFFD6" lineWeight={6} />}
          {loading === false && (
            <>
              <CategoryButtons category={category} setCategory={setCategory} />
              <ItemsList jsonData={inputFile} category={category} />
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
