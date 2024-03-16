import { useRef, useState } from "react";

interface GameProps {
    verifyLetter: (letter: string) => void,
    pickedCategory: string,
    letters: string[],
    guessedLetters: string[],
    wrongLetters: string[],
    guesses: number,
    score: number,
  }

export default function Game({
    verifyLetter, 
    pickedCategory, 
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
}: GameProps ) {

    const [ letter, setLetter ] = useState("");

    const  letterInputRef = useRef<HTMLInputElement | null>(undefined!);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        verifyLetter((letter))
        setLetter("")
        letterInputRef.current?.focus();
    }

    return(
        <div className="game p-5 h-full w-full bg-indigo-950">
            
            <p className="bold p-5">
                <span className="bold text-yellow-400 text-3xl">Pontuação: {score}</span>
            </p>

            <h1 className="p-1 text-3xl">Adivinhe a palavra</h1>

            <h3 className="p-3 tip">Dica sobre a palavra: <span className="p-2 text-yellow-500">{pickedCategory}</span></h3>
            <p>Você tem {guesses} tentavivas</p>


            <div className="flex items-center md:ml-44 md:w-[70vw] justify-center p-3 h-40 border-[15px] border-amber-400">
                {letters.map((letter, i) =>
                guessedLetters.includes(letter) ? (
            <span className="border-4 h-[20vh] w-[100px] text-black bg-white/90 text-6xl text-center p-3 uppercase border-yellow-400 font-bold" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="border-4 p-3 h-[20vh] w-[100px] text-6xl text-black font-bold
            + bg-white/90 uppercase border-amber-500"></span>
          )
        )}
            </div>

            <div className="p-5">
                <p className="mb-[1.2em]">Tente adivinhar a letra da palavra:</p>

                <form onSubmit={handleSubmit} className="flex justify-center items-center">
                    <input 
                        onChange={(e) => setLetter(e.target.value)} 
                        ref={letterInputRef} 
                        value={letter} 
                        type="text" 
                        name="letter" 
                        maxLength={1} required 
                        className="text-4xl text-center h-[50px] 
                        w-[50px] mr-10 text-black" 
                        />

                        <button>Jogar</button>
                    {/*<Button onClick={verifyLetter} title="Jogar"/>*/}
                </form>
            </div>

            <div>
                <p>Letras já utilizadas: </p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter} </span>
                ))}
            </div>
        </div>
    )
}