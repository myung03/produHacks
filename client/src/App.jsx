import { useState } from "react";
import Home from "./pages/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Camera from "./pages/Camera";
import VideoPreview from "./pages/VideoPreview";

const router = createBrowserRouter([
  {
    path: "/",
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
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
