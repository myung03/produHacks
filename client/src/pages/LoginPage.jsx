import React from "react";
import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

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
    <div>
      <form onSubmit={login}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
