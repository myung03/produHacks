import React, { useState, useEffect, useContext } from "react";
import FriendListItem from "../components/FriendListItem";
import { LoginContext } from "../App";

export default function FriendsPage() {
  const { loginState } = useContext(LoginContext);
  const [newFriend, setNewFriend] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getFriends(username) {
    try {
      const response = await fetch(
        `http://localhost:4500/users/${username}/friends`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFriends(data);
        setLoading(false);
        return data;
      } else {
        throw new Error("Unable to get friends");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const addfriend = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4500/users/addfriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendUsername: friendUsername,
          username: loginState,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFriends("NicholasFong");
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      <ul>
        {loading
          ? // Show skeletons while data is being fetched
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
          : // Show friends once data is fetched
            friends.map((friend) => (
              <FriendListItem key={friend} name={friend} />
            ))}
        <li>
          <form onSubmit={addfriend}>
            <label>
              Friendname:
              <input
                type="text"
                value={newFriend}
                onChange={(ev) => {
                  setNewFriend(ev.target.value);
                }}
              />
            </label>
            <button type="submit">Add Friend</button>
          </form>
        </li>
      </ul>
    </div>
  );
}

//Feel free to change this //Component used for placeholder while list is loading
const Skeleton = () => (
  <li className="flex items-center py-4 px-6 animate-pulse">
    <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
    <div className="ml-3">
      <div className="h-4 bg-gray-300 w-32 mb-1 rounded"></div>
      <div className="h-4 bg-gray-300 w-48 rounded"></div>
    </div>
  </li>
);
