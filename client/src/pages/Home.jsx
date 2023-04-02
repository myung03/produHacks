import React, { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const tempPush = useCallback(() => {
    // Replace recordedChunks with an appropriate value, if needed
    const recordedChunks = [];
    navigate("/record", { state: { recordedChunks: recordedChunks } });
  }, [navigate]);

  return (
    <div>
      <button onClick={tempPush}>Go to Video Screen</button>
    </div>
  );
};

export default Home;
