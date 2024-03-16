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
  //Estagio dos jogos
  const [ gameStage, setGameStage ] = useState(stages[0].name);

  //Array de palavras
  const [ wordsList ] = useState(Words);

  //Palavra
  const [ pickedWord, setPickedWord] = useState("");

  console.log("pickedWord: " + pickedWord)

  //Categoria
  const [ pickedCategory, setPickedCategory ] = useState("");

  //Letra a Letra
  const [ letters, setLetters ] = useState([""]);

  //Letras usadas
  const [ guessedLetters, setGuessedLetters ] = useState([""]);

  //Letras erradas
  const [ wrongLetters, setWrongLetters ] = useState([""]);

  //Quantidade de Tentativas
  const [ guesses, setGuesses ] = useState(guessesQty);

  //Pontuação
  const [ score, setScore ] = useState(0);

  const pickedWordAndCategory = useCallback(() => {
    //Vai pegar as chaves do objeto wordList
    const categories = Object.keys(wordsList);
    const category:string = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word: string = 
    wordsList[category][Math.floor(Math.random() *  wordsList[category].length)];

    return {word, category}
    
  }, [wordsList])

  //Iniciando o jogo
  const startGame = useCallback(() => {
    //Escolhendo a palavra e a categoria
    const {word, category} = pickedWordAndCategory();

    //Limpando as palavras
    clearLettersStates();

    //Criando array de letras
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //Preenchendo estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    //Iniciando jogo no stages 1
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
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      setScore((actualScore) => (actualScore += 50))
      startGame()
    }
  }, [guessedLetters, letters, startGame])

  return (

    <div className="flex justify-center items-center text-center text-white">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && <Game 
                                verifyLetter={verifyLetter}
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