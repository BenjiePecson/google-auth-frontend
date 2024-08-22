import axios from "axios";
import React, { useState } from "react";
import pako from "pako";
import PDFViewer from "./PDFViewer.jsx";

const Login = () => {
  const pdfUrl =
    "http://localhost:5173/file-1716973600048.pdf";

  return (
    <div>
      {/* <PDFViewer pdfUrl={pdfUrl}/> */}
    </div>
  );
};

export default Login;
