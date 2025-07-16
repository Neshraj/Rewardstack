import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoadingServer = () => {
  const navigate = useNavigate();
  const [serverAwake, setServerAwake] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    const pingServer = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/ping`);
        setServerAwake(true);
      } catch (err) {
        console.error("Server wake-up failed", err);
        setError(true);
      }
    };

    pingServer();
  }, []);

  // Redirect after wake-up
  useEffect(() => {
    if (serverAwake) {
      navigate("/claim");
    }
  }, [serverAwake, navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <p className="text-red-600 font-medium">
            Failed to wake server. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-yellow-700 font-medium">
          Waking up the server... Please wait ⏳
        </p>
      </div>
    </div>
  );
};

export default LoadingServer;
