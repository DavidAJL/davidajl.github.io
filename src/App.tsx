import {HashRouter as Router, Routes, Route} from "react-router-dom";
//import Header from "./components/Header";
import Home from "./pages/Home";
import ToothbrushTimer from "./pages/ToothbrushTimer";

import './styles/app.css'

function App() {
  return(
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/toothbrushtimer" element={<ToothbrushTimer />}/>
      </Routes>
    </Router>
  )
}

export default App;
