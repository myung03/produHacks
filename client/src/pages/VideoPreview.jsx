import React, { useState, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { LoginContext } from "../App";

export default function VideoPreview() {
  const location = useLocation();
  const recordedChunks = location.state.recordedChunks;

  const { loginState } = useContext(LoginContext);

  const handlePost = (ev) => {
    handleUpload();
    createPost(ev);
  };

  //Posting a Post in MongoDB
  const createPost = async (ev) => {
    console.log(loginState);
    ev.preventDefault();
    const now = Date.now();
    const fileName = `video-${now}.webm`;
    const response = await fetch("http://localhost:4500/initPost", {
      method: "POST",
      body: JSON.stringify({
        username: loginState,
        video: `videos/${fileName}`,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Post successfuly added");
    } else {
      alert("Post not added");
    }
  };

  const handleUpload = async () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const now = Date.now();
    const fileName = `video-${now}.webm`;
    const storageRef = ref(storage, `videos/${fileName}`);
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
      <button onClick={handlePost}>Upload Video</button>
    </div>
  );
}
