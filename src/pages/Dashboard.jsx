import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      Welcome to dashboard!!
      <button
        className="btn btn-primary"
        onClick={() => {
          googleLogout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
