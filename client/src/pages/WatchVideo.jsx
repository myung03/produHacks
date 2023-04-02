import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";

export default function WatchVideo() {
  const location = useLocation();
  const videoLink = location.state.videoLink;

  function handleLoadVideo() {
    console.log(videoLink);
  }

  return (
    <div>
      {videoLink ? (
        <video
          src={videoLink}
          autoPlay
          controls
          width={400}
          height={400}
        ></video>
      ) : (
        <p>Click the button to load the video</p>
      )}
      <button onClick={handleLoadVideo}>Load Video</button>
    </div>
  );
}
