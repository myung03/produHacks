import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const FriendListItem = ({ name }) => {
  const [videoLink, setVideoLink] = useState("");
  const navigate = useNavigate();

  //Gets friends' daily exercise
  async function getUser(username) {
    try {
      const response = await fetch(`http://localhost:4500/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        throw new Error("Unable to get user");
      }
    } catch (error) {
      console.error(error);
    }
  }

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
    getUser(name).then((data) => {
      if (data.dailyExercise == null) {
        alert("User has not completed their assignment for the day.");
      } else {
        if (videoLink !== "") {
          alert(
            `You are now watching ${name} attempt to ${data.dailyExercise}`
          );
          console.log(`Passing in ${videoLink} to watch`);
          navigate("/watch", { state: { videoLink: videoLink } });
        } else {
          console.log("VideoUrl not populated");
        }
      }
    });
  }

  return (
    <li className="flex items-center py-4 px-6 hover:bg-gray-100 hover:text-[24px]">
      <div className="flex items-center justify-center h-10 w-10 bg-[#9AD1F0] rounded-full">
        <span className="text-white text-sm font-medium">{name.charAt(0)}</span>
      </div>
      <div className="ml-3">
        <p className="text-base font-medium text-gray-800">
          {
            name
            //removed [0] after name as it was returned undefined
          }
        </p>
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
