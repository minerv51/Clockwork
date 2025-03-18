import { HashRouter as Router, Routes, Route } from "react-router-dom";
import DigitalClock from "./pages/DigitalClock";
import Settings from "./pages/Settings";
import Pomodoro from './pages/Pomodoro'
import Feedback from './pages/Feedback'
import Placeholder from "./pages/Placeholder";
import NavMenu from './components/NavMenu'
import "./styles/Global.css";
import { useState, useEffect } from "react";

function App() {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark"); //Default to dark mode

  //Apply the theme to the intial load
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/" element={<DigitalClock />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/feedback" element={<Placeholder />} />
      </Routes>
    </Router>
  );
}

export default App;
