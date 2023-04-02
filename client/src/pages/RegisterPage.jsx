import React from "react";
import { useState } from "react";
import style from "../style";
import { regis } from "../../assets/index"

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
    <div className={`${style.flexCenter} m-[1rem] mt-[20%] ${style.paragraph} flex-col gap-10`}>
    <img src={regis} alt="login graphic" className="absolute bottom-24 left-20"></img>
    <h1 className={`${style.heading2} text-center text-gradient`}>Register</h1>
    <form className={`${style.flexCenter} rounded-md p-10 flex-col glassmorphism text-[24px]`}onSubmit={register}>
      <label className="text-gray-500 mb-5">
        Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
      <br />
      <label className="text-gray-500 mb-5">
        Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
  
      <br />
      <button className="text-gray-500 bg-white rounded-md px-4 py-2" type="submit">Register</button>
    </form>
  </div>
  );
}
