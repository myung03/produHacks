import { useState } from "react";
import Home from "./pages/Home";

import RegisterPage from "./pages/RegisterPage";
import VideoPage from "./pages/VideoPage";
import VideoRecorder from "./pages/VideoPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      Hi
      <VideoRecorder />
    </div>
  );
}

export default App;
