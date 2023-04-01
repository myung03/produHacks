import { useState } from "react";
import Home from "./pages/Home";
import { BottomBar, Hero } from './components/index';

import RegisterPage from "./pages/RegisterPage";
import VideoPage from "./pages/VideoPage";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      < BottomBar></BottomBar>
      <VideoPage />
    </div>
  );
}

export default App;
