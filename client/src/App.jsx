import { createContext, useState } from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
export const LoginContext = createContext();

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Camera from "./pages/Camera";
import VideoPreview from "./pages/VideoPreview";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/camera",
    element: <Camera />,
  },
  {
    path: "/video-preview",
    element: <VideoPreview />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);

function App() {
  const [loginState, setLoginState] = useState("Login");

  return (
    <LoginContext.Provider value={{ loginState, setLoginState }}>
      <div className="App">
        <Header />
        <RouterProvider router={router} />
      </div>
    </LoginContext.Provider>
  );
}

export default App;
