import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import "tailwindcss/tailwind.css";

const VideoPage = () => {
  const [preview, setPreview] = useState(null);
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setPreview(imageSrc);
  };

  return (
    <div className="App">
      {!preview ? (
        <div className="flex flex-col h-screen">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="h-full w-full object-cover"
          />
          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white rounded-full shadow-lg focus:outline-none"
            onClick={capture}
          >
            📸
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          <img src={preview} className="h-full w-full object-cover" />
          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white rounded-full shadow-lg focus:outline-none"
            onClick={() => setPreview(null)}
          >
            ♻️
          </button>
        </div>
      )}
    </div>
  );
};

export default VidePage;
