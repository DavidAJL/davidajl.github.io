import '../styles/counter.css'
import { useState } from 'react';

function Home() {
const [count, setCount] = useState(0)
const [direction] = useState(1) // [direction, setDirection] = useState(1)



  return (
    <div>
        <button className='big-button' onClick={() => setCount((count) => count + direction)}>
            {count}
        </button>
    </div>
  );
}

export default Home;