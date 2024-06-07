import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const Filecompress = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files);
    console.log(filesArray);
    setSelectedFiles([...selectedFiles, ...filesArray]);
  };

  const handleZip = () => {
    if (!selectedFiles) {
      alert("Please select a file first.");
      return;
    }

    const zip = new JSZip();
    selectedFiles.forEach((file) => {
      zip.file(file.name, file);
    });

    zip
      .generateAsync({
        type: "blob",
        compression: "DEFLATE", // Specify the compression algorithm
        compressionOptions: {
          level: 9, // Specify the compression level (0-9)
        },
      })
      .then((content) => {
        saveAs(content, `files.zip`);
      })
      .catch((error) => {
        console.error("Error zipping file:", error);
      });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen gap-5">

      <div className="bg-slate-200 p-5 rounded-xl gap-5 flex flex-col">
        <input
          type="file"
          onChange={handleFileChange}
          className="file file-input"
          multiple
        />
        <button className="btn btn-primary btn-outline" onClick={handleZip}>
          Zip File
        </button>
      </div>
    </div>
  );
};

export default Filecompress;
