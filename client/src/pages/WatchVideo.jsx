import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default function WatchVideo() {
  const [videoUrl, setVideoUrl] = useState("");

  const handleLoadVideo = async () => {
    const storageRef = ref(storage, "videos/video-1680416546539.webm");
    const url = await getDownloadURL(storageRef);
    setVideoUrl(url);
  };

  return (
    <div>
      {videoUrl ? (
        <video
          src={videoUrl}
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
