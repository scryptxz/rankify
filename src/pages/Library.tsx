// import axios from "axios";
import { useState } from "react";
import ItemsList from "../components/ItemsList";
import CategoryButtons from "../components/CategoryButtons";
import Logo from "../assets/imgs/logos/blastfm-logo-green.png";
import FileUpload from "../components/FileUpload";
import { RaceBy } from "@uiball/loaders";

export default function Library() {
  const [inputFile, setInputFile] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [category, setCategory] = useState("master_metadata_album_artist_name");

  return (
    <main className="min-h-screen py-8 bg-primary font-['Dosis'] font-semibold">
      <section className="flex flex-col items-center m-auto gap-8 max-w-[60rem]">
        <img src={Logo} alt="Rankify logo" width={200} />
        <FileUpload
          setInputFile={setInputFile}
          setLoading={setLoading}
          setShowContent={setShowContent}
        />
        {loading && <RaceBy size={150} color="#DAFFD6" lineWeight={6} />}
        {/* <input
          type="text"
          className="w-full p-4 text-lg text-lightgreen bg-transparent border border-fuchsia-700 placeholder:text-fuchsia-700"
          placeholder="Search track/artists"
        /> */}
        {showContent && (
          <>
            <CategoryButtons category={category} setCategory={setCategory} />
            <ItemsList jsonData={inputFile} category={category} />
          </>
        )}
      </section>
    </main>
  );
}
