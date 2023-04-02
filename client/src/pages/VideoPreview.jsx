import React from "react";
import { useLocation } from "react-router-dom";

export default function VideoPreview() {
  const location = useLocation();
  const recordedChunks = location.state.recordedChunks;

  return (
    <div>
      <video
        src={URL.createObjectURL(
          new Blob(recordedChunks, { type: "video/webm" })
        )}
        autoPlay
        controls
        width={400}
        height={400}
      ></video>
    </div>
  );
}
