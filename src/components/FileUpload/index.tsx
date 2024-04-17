import { ChangeEvent, useState } from "react";

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
    <label
      htmlFor="file_upload"
      className={`w-96 relative text-center py-5 border border-white cursor-pointer rounded-2xl hover:bg-white hover:bg-opacity-5 ${
        drop && "bg-white bg-opacity-5"
      }`}
      onDragEnter={() => setDrop(true)}
      onDragLeave={() => setDrop(false)}
      onDrop={() => setDrop(false)}>
      <strong className="text-2xl font-bold text-white">
        {drop ? "Drop here" : "Upload/Drop file (JSON)"}
      </strong>
      <input
        type="file"
        accept="application/json"
        id="file_upload"
        className="absolute top-0 left-0 h-[74px] opacity-0 w-[384px] cursor-pointer"
        title=""
        multiple
        onChange={handleJSON}
      />
    </label>
  );
}
