import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Camera from "./Camera";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Camera />
    </div>
  );
}

export default App;
