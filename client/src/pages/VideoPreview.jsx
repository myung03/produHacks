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
  const now = Date.now();

  const { loginState } = useContext(LoginContext);

  const handlePost = (ev) => {
    handleUpload();
    createPost(ev);
  };

  //Posting a Post in MongoDB
  // const createPost = async (ev) => {
  //   console.log(loginState);
  //   ev.preventDefault();
  //   const now = Date.now();
  //   const fileName = `video-${now}.webm`;
  //   const response = await fetch("http://localhost:4500/initPost", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: loginState,
  //       video: `videos/${fileName}`,
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   if (response.status === 200) {
  //     alert("Post successfuly added");
  //     navigate("/friendslist");
  //   } else {
  //     alert("Post not added");
  //   }
  // };

  //Posting a Post in MongoDB
  const createPost = async (ev) => {
    console.log(loginState);
    ev.preventDefault();
    const fileName = `video-${now}.webm`;
    const response = await fetch(
      `http://localhost:4500/users/${loginState}/${fileName}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      alert("Post successfully added");
      navigate("/friendslist");
    } else {
      alert("Post not added");
    }
  };

  const handleUpload = async () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const fileName = `video-${now}.webm`;
    const storageRef = ref(storage, `videos/${fileName}`);
    await uploadBytes(storageRef, blob);
    console.log("Video uploaded");
  };

  return (
    <div className="flex flex-col h-screen">
      <video
        className="h-full w-full object-cover"
        src={URL.createObjectURL(
          new Blob(recordedChunks, { type: "video/webm" })
        )}
        autoPlay
        loop
      ></video>
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
        <button onClick={() => navigate("/record")}>🢀</button>
      </div>
      <button
        style={{
          position: "fixed",
          bottom: "10%",
          left: "50%",
          transform: "translate(-50%, 0)",
          padding: " 10px",
          borderRadius: "9999px",
          background: "#fff",
          border: "none",
          color: "#000",
          fontWeight: "bold",
          fontSize: "35px",
        }}
        onClick={handlePost}
      >
        ⚡️
      </button>
    </div>
  );
}
