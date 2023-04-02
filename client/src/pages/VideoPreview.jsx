import React from "react";

export default function VideoPreview({ location }) {
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
