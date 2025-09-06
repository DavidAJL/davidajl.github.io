import { useState } from 'react'
import ProfilePicture from './assets/fishxel2.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://github.com/DavidAJL" target="_blank">
          <img src={ProfilePicture} className="ProfilePicture" alt="DavidAJL's Profile Picture" />
        </a>
      </div>
      <h1>DavidAJL</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
