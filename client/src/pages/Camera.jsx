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

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  const videoConstraints = {
    facingMode: "user",
  };

  const handleVideoPreview = useCallback(() => {
    navigate("/video-preview", { state: { recordedChunks: recordedChunks } });
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
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white rounded-full shadow-lg focus:outline-none"
          onClick={handleStopCaptureClick}
        >
          🔴
        </button>
      ) : (
        <button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white rounded-full shadow-lg focus:outline-none"
          onClick={handleStartCaptureClick}
        >
          📸
        </button>
      )}
      {recordedChunks.length > 0 && (
        <button
          style={{
            position: "absolute",
            bottom: "10%",
            right: "50%",
            transform: "translate(50%, 0)",
            padding: "10px 20px",
            borderRadius: "9999px",
            background: "#fff",
            border: "none",
            color: "#000",
            fontWeight: "bold",
          }}
          onClick={handleDownload}
        >
          Download
        </button>
      )}
      {videoPreview && (
        <button
          style={{
            position: "absolute",
            bottom: "5%",
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
