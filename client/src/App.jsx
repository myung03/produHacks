import { createContext, useState } from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
export const LoginContext = createContext();

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Camera from "./pages/Camera";
import VideoPreview from "./pages/VideoPreview";
import WatchVideo from "./pages/WatchVideo";

const router = createBrowserRouter([
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
    path: "/",
    element: <Home />,
  },
  {
    path: "/watch",
    element: <WatchVideo />,
  },
]);

function App() {
  const [loginState, setLoginState] = useState("NicholasFong");

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
