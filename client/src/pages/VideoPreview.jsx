import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function VideoPreview() {
  const location = useLocation();
  const recordedChunks = location.state.recordedChunks;

  const handleUpload = async () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const storageRef = ref(storage, "videos/your-video-filename.webm");
    await uploadBytes(storageRef, blob);
    console.log("Video uploaded");
  };

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
      <button onClick={handleUpload}>Upload Video</button>
    </div>
  );
}
