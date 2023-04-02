import { createContext, useState } from "react";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import Post from "./components/Post";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
export const LoginContext = createContext();

function App() {
  const [loginState, setLoginState] = useState("Login");

  return (
    <LoginContext.Provider value={{ loginState, setLoginState }}>
      <Header />
      <LoginPage />
    </LoginContext.Provider>
  );
}

export default App;
