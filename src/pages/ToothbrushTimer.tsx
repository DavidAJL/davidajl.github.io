import Inside from '../assets/ToothbrushTimer/Inside.png';
import Topside from '../assets/ToothbrushTimer/Topside.png';
import Outside from '../assets/ToothbrushTimer/Outside.png';
import Teeth from '../assets/ToothbrushTimer/Teeth.png';
import BrushSound from '../assets/ToothbrushTimer/BrushSound.mp3';

import '../styles/toothbrushtimer.css'

import { useState, useEffect, useRef } from "react";

const version = "1:2";

function ToothbrushTimer() {

  // Timers
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const TOTAL_PHASES = 12;
  const LONG_DURATION = 2 * 60 * 1000;
  const SHORT_PHASE_DURATION = LONG_DURATION / TOTAL_PHASES;

  // Audio pool – 12 pre-unlocked sound objects
  const audioPoolRef = useRef<HTMLAudioElement[]>([]);
  const poolIndexRef = useRef(0);

  function logVersion() {
    console.log("Toothbrush Timer Version", version);
  }

  function start() {
    logVersion();

    // Create & unlock audio only once per run
    audioPoolRef.current = Array.from({ length: TOTAL_PHASES }, () => {
      const a = new Audio(BrushSound);
      a.volume = 0.75;
      return a;
    });

    const pool = audioPoolRef.current;
    if (!pool.length) return;

    // "Prime" all audio objects WITHOUT playing them
    pool.forEach(a => {
      a.load();     // Important: load() does not play sound but counts as a gesture-allowed action
      a.pause();    // Make sure it's stopped, even if iOS tried to auto-play
      a.currentTime = 0;
    });

    // Now play exactly one sound for feedback
    const first = pool[0];
    first.currentTime = 0;
    first.play().catch(() => {});

    // Reset the pool index after playing first
    poolIndexRef.current = 1 % pool.length;

    setStartTime(Date.now());
    setRunning(true);
    setElapsedTime(0);
  }

  function playSound() {
    const pool = audioPoolRef.current;
    if (!pool.length) return;

    const a = pool[poolIndexRef.current % pool.length];
    poolIndexRef.current++;

    a.currentTime = 0;
    a.play().catch(() => {});
  }

  // Timer ticking
  useEffect(() => {
    if (!running || startTime === null) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [running, startTime]);

  const phase = startTime ? Math.floor(elapsedTime / SHORT_PHASE_DURATION) + 1 : 0;

  const shortTimer = startTime
    ? Math.max(((SHORT_PHASE_DURATION - (elapsedTime % SHORT_PHASE_DURATION)) / 1000) - 0.1, 0)
    : 9.9;

  const longTimer = startTime ? (LONG_DURATION - elapsedTime) / 1000 : 120;
  const longTimerMin = Math.floor(longTimer / 60);
  const longTimerSec = Math.floor(longTimer % 60);

  // Stop at end
  useEffect(() => {
    if (longTimer <= 0 && running) {
      setRunning(false);
      setStartTime(null);
    }
  }, [longTimer, running]);

  // Play on phase change (but not on phase 1)
  useEffect(() => {
    if (!running || phase <= 1 || phase > TOTAL_PHASES) return;
    playSound();
  }, [phase, running]);

  return (
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className='center-frame'>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            {/* TopLeft */}
            <div className="quadrant">
              <img src={Teeth} className="image base" />
              {phase === 1 && <img src={Outside} className="image overlay" />}
              {phase === 2 && <img src={Topside} className="image overlay" />}
              {phase === 3 && <img src={Inside} className="image overlay" />}
            </div>  

            {/* TopRight */}
            <div className="quadrant flip-horizontal align-left1px">
              <img src={Teeth} className="image base" />
              {phase === 4 && <img src={Inside} className="image overlay" />}
              {phase === 5 && <img src={Topside} className="image overlay" />}
              {phase === 6 && <img src={Outside} className="image overlay" />}
            </div>            
          </div>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            {/* BottomLeft */}
            <div className="quadrant flip-vertical align-down40px">
              <img src={Teeth} className="image base" />
              {phase === 10 && <img src={Inside} className="image overlay" />}
              {phase === 11 && <img src={Topside} className="image overlay" />}
              {phase === 12 && <img src={Outside} className="image overlay" />}
            </div>  
            {/* BottomLeft */}
            <div className="quadrant flip-vertical flip-horizontal align-left1px align-down40px">
              <img src={Teeth} className="image base" />
              {phase === 7 && <img src={Outside} className="image overlay" />}
              {phase === 8 && <img src={Topside} className="image overlay" />}
              {phase === 9 && <img src={Inside} className="image overlay" />}
            </div> 
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