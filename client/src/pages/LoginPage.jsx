import React from "react";
import { useState, useContext } from "react";
import Header from "../components/Header";
import { LoginContext } from "../App";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const { setLoginState } = useContext(LoginContext);

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
      });
    } else {
      alert("wrong credentials");
    }
  }

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
