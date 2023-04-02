import { createContext, useState } from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import HeroPage from "./pages/HeroPage";
import RegisterPage from "./pages/RegisterPage";
export const LoginContext = createContext();

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Camera from "./pages/Camera";
import VideoPreview from "./pages/VideoPreview";
import WatchVideo from "./pages/WatchVideo";
import FriendsPage from "./pages/FriendsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/record",
    element: <Camera />,
  },
  {
    path: "/preview",
    element: <VideoPreview />,
  },
  {
    path: "/watch",
    element: <WatchVideo />,
  },
  {
    path: "/friendslist",
    element: <FriendsPage />,
  },
  { path: "/register", element: <RegisterPage /> },
]);

function App() {
  const [loginState, setLoginState] = useState("");

  return (
    <div>
      <LoginContext.Provider value={{ loginState, setLoginState }}>
        <div className="App">
          <Header />
          <RouterProvider router={router} />
        </div>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
