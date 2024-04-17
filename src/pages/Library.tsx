// import axios from "axios";
import { useState } from "react";
import ArtistsList from "../components/ArtistsList";
import TracksList from "../components/TracksList";
import Buttons from "../components/Buttons";
import Logo from "../assets/imgs/logos/blastfm-logo-white.png";
import AlbumsList from "../components/AlbumsList";
import FileUpload from "../components/FileUpload";
import { RaceBy } from "@uiball/loaders";

export default function Library() {
  const [type, setType] = useState<string>("artists");
  const [inputFile, setInputFile] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  return (
    <main className="min-h-screen py-8 bg-gradient-to-tl from-darker to-light font-['Dosis'] font-semibold">
      <section className="flex flex-col items-center m-auto gap-12 w-[60rem]">
        <img src={Logo} alt="BlastFM logo" width={200} />
        <FileUpload
          setInputFile={setInputFile}
          setLoading={setLoading}
          setShowContent={setShowContent}
        />
        {loading && <RaceBy size={150} color="#ffffff" lineWeight={6} />}
        {/* <input
          type="text"
          className="w-full p-4 text-xl text-white bg-transparent border border-fuchsia-700 placeholder:text-fuchsia-700"
          placeholder="Search track/artists"
        /> */}
        {showContent && (
          <>
            <Buttons type={type} setType={setType} />
            {type === "artists" ? (
              <ArtistsList inputFile={inputFile} />
            ) : type === "tracks" ? (
              <TracksList inputFile={inputFile} />
            ) : (
              <AlbumsList inputFile={inputFile} />
            )}
          </>
        )}
      </section>
    </main>
  );
}
