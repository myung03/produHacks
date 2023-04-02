import React from "react";

const FriendListItem = ({ name }) => {
  return (
    <li className="flex items-center py-4 px-6 hover:bg-gray-100">
      <div className="flex items-center justify-center h-10 w-10 bg-orange-500 rounded-full">
        <span className="text-white text-sm font-medium">{name[0]}</span>
      </div>
      <div className="ml-3">
        <p className="text-base font-medium text-gray-800">{name}</p>
      </div>
    </li>
  );
};

export default FriendListItem;
