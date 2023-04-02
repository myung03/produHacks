import React from "react";
import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import style from "../style";
import { prompt } from "../../assets/index"
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { setLoginState } = useContext(LoginContext);

  const navigate = useNavigate();
  const navigateHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4500/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setLoginState(userInfo.username);
        alert("successful login");
        updateExercise(userInfo.username);
        navigateHome();
      });
    } else {
      alert("wrong credentials");
    }
  }

  const updateExercise = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:4500/users/${username}/exercise`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${style.flexCenter} m-[1rem] mt-[20%] ${style.paragraph} flex-col gap-10`}>
      <img src={prompt} alt="login graphic" className="absolute bottom-24"></img>
      <h1 className={`${style.heading2} text-center text-gradient`}>Login</h1>
      <form className={`${style.flexCenter} rounded-md p-10 flex-col glassmorphism text-[24px]`}onSubmit={login}>
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
        <button className="text-gray-500 bg-white rounded-md px-4 py-2" type="submit">Login</button>
      </form>
    </div>
  );
}
