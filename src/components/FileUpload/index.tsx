import { ChangeEvent, useEffect, useState } from "react";
import { RiExternalLinkLine } from "react-icons/ri";
interface SpotifyPlaybackEvent {
  ts: string;
  username: string;
  platform: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  master_metadata_album_album_name: string;
  spotify_track_uri: string;
}
interface FileUploadInterface {
  inputFile: SpotifyPlaybackEvent[];
  setInputFile: (value: SpotifyPlaybackEvent[]) => void;
  setLoading: (value: boolean) => void;
}

export default function FileUpload(props: FileUploadInterface) {
  const { setInputFile, setLoading, inputFile } = props;
  const [drop, setDrop] = useState<boolean>(false);
  const [userFiles, setUserFiles] = useState<FileList | null>();
  const [count, setCount] = useState(0);

  function handleJSON(e: ChangeEvent<HTMLInputElement>) {
    setCount(0);
    const target = e.target as HTMLInputElement;
    const files = target.files;

    setUserFiles(files);
    if (files) {
      let concatFiles: SpotifyPlaybackEvent[] = [];
      for (let i = 0; i < files.length; i++) {
        console.log(i);
        const reader = new FileReader();
        const element = files[i];
        reader.readAsText(element);
        reader.onloadstart = () => {
          setLoading(true);
        };
        reader.onloadend = (e: ProgressEvent<FileReader>) => {
          console.log(e);
          try {
            const data = e.target?.result as string;
            const json = JSON.parse(data);
            concatFiles = concatFiles.concat(json);
            setInputFile(concatFiles);
          } catch (error) {
            alert("Invalid file!");
            setLoading(false);
          } finally {
            setCount((prev) => prev + 1);
          }
        };
      }
    } else {
      alert("Error");
    }
  }

  useEffect(() => {
    userFiles?.length === count && setLoading(false);
  }, [userFiles?.length, count, setLoading, inputFile]);

  return (
    <div>
      <label
        htmlFor="file_upload"
        className={`relative flex justify-center w-[20rem] h-[6rem] text-center px-10 border border-lightgreen cursor-pointer rounded-2xl hover:(bg-lightgreen bg-opacity-15) ${
          drop && "bg-lightgreen bg-opacity-5"
        }`}
        onDragEnter={() => setDrop(true)}
        onDragLeave={() => setDrop(false)}
        onDrop={() => setDrop(false)}>
        <strong className="text-xl font-bold text-lightgreen my-auto">
          {drop ? "Drop here" : "Upload/Drop your spotify history files (JSON)"}
        </strong>
        <input
          type="file"
          accept="application/json"
          id="file_upload"
          className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
          title=""
          multiple
          onChange={handleJSON}
        />
      </label>
      <a
        href="https://www.spotify.com/account/privacy/"
        target="_blank"
        className="flex items-center justify-center gap-2 mt-2 text-light font-normal hover:underline">
        Request your data file here
        <RiExternalLinkLine />
      </a>
    </div>
  );
}
