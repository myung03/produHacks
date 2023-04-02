import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const FriendListItem = ({ name }) => {
  const [videoLink, setVideoLink] = useState("");
  const navigate = useNavigate();

  //Returns link to video
  async function getPostByUsername(username) {
    try {
      const response = await fetch(`http://localhost:4500/posts/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        return data[0].video;
      } else {
        throw new Error("Unable to get post");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Returns video
  const handleLoadVideo = async (result) => {
    const storageRef = ref(storage, result);
    const url = await getDownloadURL(storageRef);
    setVideoLink(url);
  };

  useEffect(() => {
    getPostByUsername(name).then((result) => {
      console.log(result);
      handleLoadVideo(result).then((_) => {
        console.log(videoLink);
      });
    });
  }, []);

  function handleClick() {
    //Verify that videoUrl has been populated
    if (videoLink !== "") {
      console.log(`Passing in ${videoLink} to watch`);
      navigate("/watch", { state: { videoLink: videoLink } });
    } else {
      console.log("VideoUrl not populated");
    }
  }

  return (
    <li className="flex items-center py-4 px-6 hover:bg-gray-100">
      <div className="flex items-center justify-center h-10 w-10 bg-orange-500 rounded-full">
        <span className="text-white text-sm font-medium">{name[0]}</span>
      </div>
      <div className="ml-3">
        <p className="text-base font-medium text-gray-800">{name}</p>
      </div>
      <button
        className="flex-shrink-0 ml-auto bg-transparent text-gray-600 hover:text-gray-800 border-transparent border-4 focus:outline-none focus:border-gray-800 focus:text-gray-800 rounded-full p-2 transition-colors"
        onClick={handleClick}
      >
        📨
      </button>
    </li>
  );
};

export default FriendListItem;
