import { useState } from "react";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <VideoPage />
    </div>
  );
}

export default App;
