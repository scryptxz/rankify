// import axios from "axios";
import { useState } from "react";
import ArtistsList from "../components/ArtistsList";
import TracksList from "../components/TracksList";
import Buttons from "../components/Buttons";
import Logo from "../assets/imgs/logos/blastfm-logo-white.png"
import AlbumsList from "../components/AlbumsList";

export default function Library() {
  const [type, setType] = useState<string>("artists");

  return (
    <div className="min-h-screen py-8 bg-gradient-to-tl from-slate-700 to-blue-950 font-['Dosis'] font-semibold">
      <img src={Logo} alt="BlastFM logo" width={200} className="m-auto mb-8" />
      <div className="flex flex-col items-center m-auto gap-12 w-[60rem]">
        <Buttons type={type} setType={setType} />
        {/* <input
          type="text"
          className="w-full p-4 text-xl text-white bg-transparent border border-fuchsia-700 placeholder:text-fuchsia-700"
          placeholder="Search track/artists"
        /> */}
        {type === "artists" ? <ArtistsList /> : type === "tracks" ? <TracksList /> : <AlbumsList />}
      </div>
    </div>
  );
}
