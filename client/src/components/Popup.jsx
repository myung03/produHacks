import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Popup = ({ popupText }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log("Dismissed dialog");
      setIsActive(false);
    }
  };

  const handleClick = () => {
    console.log("Clicked dialog");
    setIsActive(false);

    navigateRecordVideo();
  };

  const navigateRecordVideo = useCallback(() => {
    // Replace recordedChunks with an appropriate value, if needed
    const recordedChunks = [];
    navigate("/record", { state: { recordedChunks: recordedChunks } });
  }, [navigate]);

  return isActive ? (
    <div
      className="fixed top-0 left-0 h-full w-full z-50 flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Today's Challenge
        </h2>
        <p className="text-lg text-center mb-4">{popupText}</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          Let's Go 💙
        </button>
      </div>
    </div>
  ) : null;
};

export default Popup;
