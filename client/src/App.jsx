import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      < Home/>
    </div>
  )
}

export default App
