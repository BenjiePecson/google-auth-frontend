import React from "react";
import { useNavigate } from "react-router-dom";

const Gdrive = () => {
  const navigate = useNavigate();
  return (
    <div>
      Welcome to Gdrive!!
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Gdrive;
