import ProfilePicture from '../assets/fishxel2.png';
import { Link } from "react-router-dom";
import '../styles/home.css'
// import { useState } from 'react';

function Home() {
// const [count, setCount] = useState(0)

  return (
    <>
      <div className='user-info-box'>
        <a href="https://github.com/DavidAJL" target="_blank">
          <img src={ProfilePicture} className="ProfilePicture" alt="DavidAJL's Profile Picture" />
        </a>
        <div className='user-info-name'>
          <h1 style={{lineHeight: '0'}}>David</h1>
          <h2 style={{lineHeight: '0'}}>A. J. Lewis</h2>
          <>Student at Chalmers</>
        </div>
      </div>
      {/* <div className='user-info-box'>
        <h2>David A. J. Lewis</h2>
      </div> */}
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
      <h2 style={{marginTop: '50px'}}>My Projects:</h2>
      <div>
        <Link to="/toothbrushtimer">ToothbrushTimer</Link>
      </div>
    </>
  );
}

export default Home;