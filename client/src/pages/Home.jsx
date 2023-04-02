import React, { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

const Home = () => {
  const navigate = useNavigate();
  const navigateRecordVideo = useCallback(() => {
    // Replace recordedChunks with an appropriate value, if needed
    const recordedChunks = [];
    navigate("/record", { state: { recordedChunks: recordedChunks } });
  }, [navigate]);

  return (
    <div>
      {/* <button onClick={navigateRecordVideo}>Go to Video Screen</button> */}
      <Popup popupText={"Vlog yourself creating and eating a healthy meal!"} />
    </div>
  );
};

export default Home;
