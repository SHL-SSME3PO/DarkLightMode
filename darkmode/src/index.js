import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [darkmode, setdarkmode] = useState(getInitialMode());

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkmode));
  }, [darkmode]);
  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const saveMode = JSON.parse(localStorage.getItem("dark"));
    const userPreferedDark = getPrefColorScheme();
    getPrefColorScheme();
    if (isReturningUser) {
      return saveMode;
    } else if (userPreferedDark) {
      return true;
    } else {
      return false;
    }
  }

  function getPrefColorScheme() {
    if (!window.matchMedia) return;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return (
    <div className={darkmode ? "dark-mode" : "light-mode"}>
      <nav>
        <div className="toggle-container">
          <span style={{ color: darkmode ? "gray" : "yellow" }}>☀</span>
          <span className="toggle">
            <input
              type="checkbox"
              id="checkbox"
              checked={darkmode}
              onChange={() => setdarkmode(prevMode => !prevMode)}
            />

            <label htmlFor="checkbox" />
          </span>
          <span style={{ color: darkmode ? "yellow" : "gray" }}>☾</span>
        </div>
      </nav>
      <main>
        <h1>{darkmode ? "Dark Mode" : "Light Mode"}</h1>
        <h2>Toggle the switch to see some magic happen!</h2>
      </main>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
