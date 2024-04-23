import { ChangeEvent, useState } from "react";
import { RiExternalLinkLine } from "react-icons/ri";

interface FileUploadInterface {
  setInputFile: (value: any) => void;
  setLoading: (value: any) => void;
  setShowContent: (value: any) => void;
}

export default function FileUpload(props: FileUploadInterface) {
  const { setInputFile, setLoading, setShowContent } = props;
  const [drop, setDrop] = useState<boolean>(false);

  function handleJSON(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadstart = () => {
        setLoading(true);
      };

      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        try {
          const data = e.target?.result as string;
          const json = JSON.parse(data);
          setInputFile(json);
          setLoading(false);
          setShowContent(true);
        } catch (error) {
          alert("Invalid file!");
          setLoading(false);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Error");
    }
  }
  return (
    <div>
      <label
        htmlFor="file_upload"
        className={`relative flex justify-center w-[20rem] h-[6rem] text-center px-10 border border-lightgreen cursor-pointer rounded-2xl hover:(bg-lightgreen bg-opacity-15) ${
          drop && "bg-lightgreen bg-opacity-5"
        }`}
        onDragEnter={() => setDrop(true)}
        onDragLeave={() => setDrop(false)}
        onDrop={() => setDrop(false)}
      >
        <strong className="text-xl font-bold text-lightgreen my-auto">
          {drop ? "Drop here" : "Upload/Drop your spotify history file (JSON)"}
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
        className="flex items-center justify-center gap-2 mt-2 text-light font-normal hover:underline"
      >
        Request your data file here
        <RiExternalLinkLine />
      </a>
    </div>
  );
}
