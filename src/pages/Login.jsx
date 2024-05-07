import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_VERCEL_SERVER_URL;

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(`${serverUrl}/auth/google`, {
        code,
      });
      console.log(tokens);
      navigate("/dashboard");
    },
    flow: "auth-code",
  });
  return (
    <div>
      <div className="App">
        <button className="btn btn-text" onClick={googleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
