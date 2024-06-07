import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import Filecompress from "./pages/Filecompress";

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

          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/gdrive" element={<Dashboard />} />

          <Route path="/filecompress" element={<Filecompress />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
