import { useState, useEffect, useCallback } from 'react';

import StartScreen from './components/StartScreen';

import './App.css';
import Game from './components/Game';
import GameOver from './components/GameOver';
import { Words } from './data/Words';

const stages = [
  { id: 1, name: "start" },
  { id: 1, name: "game" },
  { id: 1, name: "end" }
]

export default function App() {

  const [ gameStage, setGameStage ] = useState(stages[0].name);
  
  const [ wordsList ] = useState(Words);
  console.log(wordsList);

  return (
    
    <div className="flex justify-center items-center text-center text-white">
      {gameStage === 'start' && <StartScreen />}
      {gameStage === 'game' && <Game />}
      {gameStage === 'end' && <GameOver />}
    </div>

  )
}
