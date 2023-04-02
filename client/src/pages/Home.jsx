import React, { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const { loginState } = useContext(LoginContext);
<<<<<<< HEAD
  const [friendusername, setFriendusername] = useState("");
=======
  const [friendUsername, setFriendUsername] = useState("");
>>>>>>> origin/main
  const tempPush = useCallback(() => {
    // Replace recordedChunks with an appropriate value, if needed
    const recordedChunks = [];

    navigate("/camera", { state: { recordedChunks: recordedChunks } });
  }, [navigate]);

  const addfriend = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/users/addfriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
<<<<<<< HEAD
        body: JSON.stringify({ friendusername, loginState }),
=======
        body: JSON.stringify({
          friendUsername: friendUsername,
          username: loginState,
        }),
>>>>>>> origin/main
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={addfriend}>
        <label>
          Friendname:
          <input
            type="text"
<<<<<<< HEAD
            value={friendusername}
            onChange={(ev) => {
              setFriendusername(ev.target.value);
=======
            value={friendUsername}
            onChange={(ev) => {
              setFriendUsername(ev.target.value);
>>>>>>> origin/main
            }}
          />
        </label>
        <button type="submit">Add Friend</button>
        <button onClick={tempPush}>Go to Video Screen</button>
      </form>
    </div>
  );
};

export default Home;
