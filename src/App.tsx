import { useState } from 'react';

import StartScreen from './components/StartScreen';

import Game from './components/Game';
import GameOver from './components/GameOver';
import { Words } from './data/Words';

import './App.css';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

export default function App() {

  const [ gameStage, setGameStage ] = useState(stages[0].name);

  const [ wordsList ] = useState(Words);

  const [ guessedLetters, setGuessedLetters ] = useState([]);
  const [ wrongLetters, setWrongLetters ] = useState([]);
  const [ guesses, setGuesses ] = useState(3);
  const [ score, setScore ] = useState(0);

  const [ pickedWord, setPickedWord] = useState("");
  const [ pickedCategory, setPickedCategory ] = useState("");
  const [letters, setLetters ] = useState([]);

  const pickedWordAndCategory = () => {
    //Vai pegar as chaves do objeto wordList
    const categories = Object.keys(wordsList);
    const category:string = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word: string = 
    wordsList[category][Math.floor(Math.random() *  wordsList[category].length)];

    console.log(word)
    return {word, category}
  }

  //Start the secret word game
  const startGame = () => {
    //Pick word and pick category
    const {word, category} = pickedWordAndCategory();
    console.log(word, category)

    //create an array of latters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);

    setGameStage(stages[1].name);
  }

  const verifyLetter = (letter: string) => {
    console.log(letter)
  }

  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (

    <div className="flex justify-center items-center text-center text-white">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game 
                                verifyLetter={verifyLetter} 
                                pickedWord={pickedWord} 
                                pickedCategory={pickedCategory} 
                                letters={letters}
                                guessedLetters={guessedLetters}
                                wrongLetters={wrongLetters}
                                guesses={guesses}
                                score={score}
                                />}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>

  )
}
