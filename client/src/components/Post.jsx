import React from "react";
import { useState } from "react";

export default function Post() {
  return useEffect(() => {
    async function getUser() {
      const response = await fetch("http://localhost:4500/users/username");
      const data = await response.json();
      setUser(data);
    }

    getUser();
  }, []);
}
