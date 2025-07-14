import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-dashed rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
