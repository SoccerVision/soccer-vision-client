import React from 'react';
import './App.css';
import PhaserGame from "./components/PhaserGame/PhaserGame";
import Scoreboard from "./components/Scoreboard/Scoreboard";

function App() {
  return (
    <div className="App">
        <PhaserGame />
        <Scoreboard />
    </div>
  );
}

export default App;
