//import Inside from '../assets/ToothbrushTimer/Inside.png';
//import Topside from '../assets/ToothbrushTimer/Topside.png';
//import Outside from '../assets/ToothbrushTimer/Outside.png';
import Teeth from '../assets/ToothbrushTimer/Teeth.png';

import '../styles/toothbrushtimer.css'

import { useState, useEffect } from "react";

function ToothbrushTimer() {
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const TOTAL_PHASES = 12;
  const LONG_DURATION = 2 * 60 * 1000;
  const SHORT_PHASE_DURATION = LONG_DURATION/TOTAL_PHASES;

  function start() {
    setStartTime(Date.now());
    setRunning(true);
    setElapsedTime(0);
  }

  useEffect(() => {
    if (!running || startTime === null) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [running, startTime]);

  const phase = startTime ? Math.floor(elapsedTime / SHORT_PHASE_DURATION) + 1 : 1;

  const shortTimer = startTime ? Math.max(((SHORT_PHASE_DURATION - (elapsedTime % SHORT_PHASE_DURATION)) / 1000)- 0.1,0) : 9.9;
  
  const longTimer = startTime ? (LONG_DURATION - elapsedTime) / 1000 : 120;
  const longTimerMin = Math.floor(longTimer / 60);
  const longTimerSec = Math.floor(longTimer % 60);

   useEffect(() => {
    if (longTimer <= 0 && running) {
      setRunning(false);
      setStartTime(null);
    }
  }, [longTimer, running]);

  return (
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <img src={Teeth} className="Teeth image" />
            <img src={Teeth} className="Teeth image flip-horizontal align-left1px" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <img src={Teeth} className="Teeth image flip-vertical align-down40px" />
            <img src={Teeth} className="Teeth image flip-horizontal flip-vertical align-left1px align-down40px" />
          </div>
        </div>
        <div className='center-frame'>
          {!running && (
            <div className="timer-card button" onClick={start}>
              Start
            </div>
          )}
          {running && (
            <div className='timer-stack'>
              <div className="timer-card timer-minor">
                {phase}/12
              </div>
              <div className="timer-card">
                {(shortTimer).toFixed(1)}
              </div>
              <div className="timer-card timer-minor">
                {longTimerMin.toFixed(0).padStart(2, "0")}:{longTimerSec.toFixed(0).padStart(2, "0")}
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default ToothbrushTimer;