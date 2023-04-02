import React, { useState, useEffect } from "react";
import FriendListItem from "../components/FriendListItem";

//Feel free to change this
const Skeleton = ({ index }) => (
  <li key={index} className="flex items-center py-4 px-6 animate-pulse">
    <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
    <div className="ml-3">
      <div className="h-4 bg-gray-300 w-32 mb-1 rounded"></div>
      <div className="h-4 bg-gray-300 w-48 rounded"></div>
    </div>
  </li>
);

export default function FriendsPage() {
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

  useEffect(() => {
    getFriends("NicholasFong");
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      <ul>
        {loading
          ? // Show skeletons while data is being fetched
            Array.from({ length: 6 }).map((_, i) => <Skeleton index={i} />)
          : // Show friends once data is fetched
            friends.map((friend) => (
              <FriendListItem key={friend} name={friend} />
            ))}
      </ul>
    </div>
  );
}
