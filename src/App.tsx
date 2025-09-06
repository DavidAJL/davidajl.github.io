import { useState } from 'react'
import ProfilePicture from './assets/fishxel2.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="https://github.com/DavidAJL" target="_blank">
            <img src={ProfilePicture} className="ProfilePicture" alt="DavidAJL's Profile Picture" />
          </a>
          <h1>DavidAJL</h1>
        </div>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
