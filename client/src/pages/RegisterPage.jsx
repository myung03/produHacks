import React from "react";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4500/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successful");
    } else {
      alert("registration failed");
    }
  }

  return (
    <form onSubmit={register}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
