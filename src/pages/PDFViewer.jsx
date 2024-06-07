import React, { useEffect, useRef, useState } from "react";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import download from "downloadjs";

const PDFViewer = ({ pdfUrl }) => {
  const [pdfInfo, setPdfInfo] = useState([]);

  useEffect(() => {
    modifyPdf();
  }, []);

  const modifyPdf = async () => {
    const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText("This text was added with JavaScript!", {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    });

    const pdfBytes = await pdfDoc.save();
    const bytes = new Uint8Array(pdfBytes);
    // Trigger the browser to download the PDF document
    // download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");

    // const docUrl = URL.createObjectURL(
    //   new Blob(pdfBytes, { type: "application/pdf" })
    // );
    // setPdfInfo(docUrl);

    // open(URL.createObjectURL(new Blob(bytes, {type: "application/pdf"})));
    var ele = document.createElement("A");
    ele.textContent = "Open PDF file";
    ele.href = URL.createObjectURL(
      new Blob(pdfBytes, { type: "application/pdf" })
    );
    ele.target = "_blank";
    document.body.appendChild(ele);
  };

  return (
    <>
      {
        <iframe
          style={{ width: "1000px" }}
          title="test-frame"
          src={`https://pdf-lib.js.org/assets/with_update_sections.pdf`}
          type="application/pdf"
        />
      }
    </>
  );
};

export default PDFViewer;
