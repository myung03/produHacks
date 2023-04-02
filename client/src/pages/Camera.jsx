import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

export default function Camera() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoPreview, setVideoPreview] = useState(false);
  const navigate = useNavigate();

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    setRecordedChunks([]);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setVideoPreview(true);
  }, [mediaRecorderRef, setCapturing, setVideoPreview]);

  const videoConstraints = {
    facingMode: "user",
  };

  const handleVideoPreview = useCallback(() => {
    navigate("/preview", { state: { recordedChunks: recordedChunks } });
  }, [navigate, recordedChunks]);

  return (
    <div className="flex flex-col h-screen">
      <Webcam
        audio={false}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        className="h-full w-full object-cover"
      />
      {capturing ? (
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
          onClick={handleStopCaptureClick}
        >
          🔴
        </button>
      ) : (
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
          onClick={handleStartCaptureClick}
        >
          📸
        </button>
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
        <button onClick={() => navigate("/home")}>🢀</button>
      </div>
      {/* Only show the Preview Video button if setCapturing is false and videoPreview is true */}
      {!capturing && videoPreview && (
        <button
          style={{
            position: "absolute",
            bottom: "20%",
            left: "50%",
            transform: "translate(-50%, 0)",
            padding: "10px 20px",
            borderRadius: "9999px",
            background: "#fff",
            border: "none",
            color: "#000",
            fontWeight: "bold",
          }}
          onClick={handleVideoPreview}
        >
          Preview Video
        </button>
      )}
    </div>
  );
}
