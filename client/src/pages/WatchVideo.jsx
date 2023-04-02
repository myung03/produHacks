import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function WatchVideo() {
  const location = useLocation();
  const videoLink = location.state.videoLink;
  const navigate = useNavigate();

  function handleLoadVideo() {
    console.log(videoLink);
  }

  return (
    <div className="flex flex-col h-screen">
      {videoLink ? (
        <video
          className="h-full w-full object-cover"
          src={videoLink}
          autoPlay
          controls
        ></video>
      ) : (
        <p>Temporarily unavailable</p>
      )}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          margin: "20px",
          padding: "10px 20px",
          borderRadius: "9999px",
          background: "#fff",
        }}
      >
        <button onClick={() => navigate("/friendslist")}>🢀</button>
      </div>
    </div>
  );
}
