import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import Filecompress from "./pages/Filecompress";
import NOM from "./pages/NOM";
import ReactPDFPage from "./pages/ReactPDF.jsx";
import GenNomPage from "./pages/GenNomPage.jsx";
import GenSecCertPage from "./pages/GenSecCertPage.jsx";
import ReactDatatableDND from "./pages/ReactDatatableDND.jsx";
// import PDFMe from "./pages/PDFMe.tsx";

// Ensures cookie is sent
// axios.defaults.baseURL = import.meta.env.VITE_VERCEL_SERVER_URL;
axios.defaults.baseURL = import.meta.env.VITE_VERCEL_LOCALHOST_SERVER_URL;

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Filecompress />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/gdrive" element={<Dashboard />} />

          <Route path="/filecompress" element={<Filecompress />} />

          <Route path="/nom" element={<NOM />} />
          <Route path="/pdf" element={<ReactPDFPage />} />
          <Route path="/genNom" element={<GenNomPage />} />
          <Route path="/genseccert" element={<GenSecCertPage />} />
          <Route path="/tablednd" element={<ReactDatatableDND />} />
          {/* <Route path="/pdfme" element={<PDFMe />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
