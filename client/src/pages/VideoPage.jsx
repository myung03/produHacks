import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import "tailwindcss/tailwind.css";

const VideoPage = () => {
  const [preview, setPreview] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const webcamRef = useRef(null);

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setChunks((prev) => [...prev, e.data]);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setPreview(url);
        setChunks([]);
      };
    }
  }, [mediaRecorder]);

  const startRecording = () => {
    console.log("Started recording");
    setRecording(true);
    const stream = webcamRef.current.stream;
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    recorder.start();
  };

  const stopRecording = () => {
    console.log("Stopping recording");
    setRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <div className="App">
      {!preview ? (
        <div className="flex flex-col h-screen">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="h-full w-full object-cover"
          />
          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white rounded-full shadow-lg focus:outline-none"
            onClick={recording ? stopRecording : startRecording}
          >
            📸
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          <video src={preview} className="h-full w-full object-cover" muted />
          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white rounded-full shadow-lg focus:outline-none"
            onClick={() => setPreview(null)}
          >
            ♻️
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
