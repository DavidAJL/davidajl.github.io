import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ToothbrushTimer from "./pages/ToothbrushTimer";
import Counter from "./pages/Counter";

import './styles/app.css'

function App() {
  return(
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/toothbrushtimer" element={<ToothbrushTimer />}/>
        <Route path="/counter" element={<Counter />}/>
      </Routes>
    </Router>
  )
}

export default App;
