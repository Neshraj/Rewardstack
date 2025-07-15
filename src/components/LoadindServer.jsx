import React from "react";

const LoadingServer = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-yellow-700 font-medium">Waking up the server... Please wait ⏳</p>
      </div>
    </div>
  );
};

export default LoadingServer;
