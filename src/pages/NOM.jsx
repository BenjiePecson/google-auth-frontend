import React, { useState } from "react";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import SECCERT from "../assets/SECCERT.pdf";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import fontkit from "@pdf-lib/fontkit";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const NOM = () => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [openFile, setOpenFile] = useState(null);

  function onDocumentLoadSuccess({ numPages: numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <div>NOM</div>
      <button
        className="btn btn-primary"
        onClick={async () => {
          // const url1 = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
          const existingPdfBytes = await fetch(SECCERT).then((res) =>
            res.arrayBuffer()
          );
          const fontBytes = await fetch("/ProximaNovaBlack.ttf").then((res) =>
            res.arrayBuffer()
          );

          console.log(fontBytes);
          const pdfDoc = await PDFDocument.load(existingPdfBytes);
          // const pdfDoc = await PDFDocument.create();
          // const timesRomanFont = await pdfDoc.embedFont(
          //   StandardFonts.TimesRoman
          // );
          pdfDoc.registerFontkit(fontkit);
          const customFont = await pdfDoc.embedFont(fontBytes);

          // const page = pdfDoc.addPage();
          const page = pdfDoc.getPages();
          const firstpage = page[0];

          const { width, height } = firstpage.getSize();
          const fontSize = 30;
          firstpage.drawText("Creating PDFs in JavaScript is awesome!", {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: customFont,
            color: rgb(0, 0.53, 0.71),
            maxWidth: 500,
          });

          const pdfBytes = await pdfDoc.save();

          const blob = new Blob([pdfBytes], { type: "application/pdf" });

          // Create a URL for the Blob
          const url = URL.createObjectURL(blob);

          // Open the URL in a new tab/window or prompt user to download it
          // window.open(url);
          setOpenFile(url);
        }}
      >
        Click me!
      </button>

      <div className="bg-red-500">
        <Document file={openFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>

      <>
        <h1>iFrame Rendering of PDF Blob</h1>
        <iframe
          title="pdf"
          src={openFile}
          style={{ height: "1250px", width: "100%" }}
        ></iframe>
      </>
    </>
  );
};

export default NOM;
