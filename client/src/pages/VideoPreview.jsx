import React, { useState, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { LoginContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function VideoPreview() {
  const location = useLocation();
  const recordedChunks = location.state.recordedChunks;
  const navigate = useNavigate();

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
      navigate("/friendslist");
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
        className="h-full w-full object-cover"
        src={URL.createObjectURL(
          new Blob(recordedChunks, { type: "video/webm" })
        )}
        autoPlay
        controls
        width={400}
        height={400}
      ></video>
      <button
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white rounded-full shadow-lg focus:outline-none"
        onClick={handlePost}
      >
        ⚡️
      </button>
    </div>
  );
}
