import { useCallback, useEffect, useState } from 'react';

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

const guessesQty = 3;

function App() {

  const [ gameStage, setGameStage ] = useState(stages[0].name);
  const [ wordsList ] = useState(Words);

  const [ pickedWord, setPickedWord] = useState("");
  const [ pickedCategory, setPickedCategory ] = useState("");
  const [ letters, setLetters ] = useState([""]);

  const [ guessedLetters, setGuessedLetters ] = useState([""]);
  const [ wrongLetters, setWrongLetters ] = useState([""]);
  const [ guesses, setGuesses ] = useState(guessesQty);
  const [ score, setScore ] = useState(0);

  const pickedWordAndCategory = useCallback(() => {
    //Vai pegar as chaves do objeto wordList
    const categories = Object.keys(wordsList);
    const category:string = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word: string = 
    wordsList[category][Math.floor(Math.random() *  wordsList[category].length)];

    return {word, category}
    
  }, [wordsList])

  //Start the secret word game
  const startGame = useCallback(() => {
    //Pick word and pick category
    const {word, category} = pickedWordAndCategory();

    clearLettersStates();
    //create an array of latters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickedWordAndCategory]);
  
  const verifyLetter = (letter: string) => {
    
    const normalizedLetter = (letter as string).toString().toLowerCase();
    
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }
    
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ])
    } else if (typeof normalizedLetter === 'string' && normalizedLetter.length === 1) {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
        
      ])
      
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }
const retry = () => {
  setScore(0);
  setGuesses(guessesQty);
  setGameStage(stages[0].name);
}
const clearLettersStates = () => {
  setGuessedLetters([])
  setWrongLetters([])
}
  useEffect(() => {
    if(guesses <= 0) {

      clearLettersStates()

      setGameStage(stages[2].name)
    }
  }, [guesses]);

  useEffect(() => {
    //Array de letras unicas
    const uniqueLetters = [...new Set(letters)]
    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore += 50))
      startGame()
    }
  }, [guessedLetters, letters, startGame])

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
      {gameStage === 'end' && <GameOver score={score} retry={retry}/>}
    </div>

  )
}
export default App;