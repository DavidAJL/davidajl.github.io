//import Inside from '../assets/ToothbrushTimer/Inside.png';
//import Topside from '../assets/ToothbrushTimer/Topside.png';
//import Outside from '../assets/ToothbrushTimer/Outside.png';
import Teeth from '../assets/ToothbrushTimer/Teeth.png';

import '../styles/toothbrushtimer.css'

function ToothbrushTimer() {
  return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <img src={Teeth} className="Teeth image" />
          <img src={Teeth} className="Teeth image flip-horizontal align-left1px" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <img src={Teeth} className="Teeth image flip-vertical align-down20px" />
          <img src={Teeth} className="Teeth image flip-horizontal flip-vertical align-left1px align-down20px" />
        </div>
      </div>
  );
}

export default ToothbrushTimer;