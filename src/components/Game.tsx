import Button from "../layout/Button";

export default function Game( {verifyLetter, 
                              pickedWord, 
                              pickedCategory, 
                              letters,
                              guessedLetters,
                              wrongLetters,
                              guesses,
                              score
                            }:any ) {
    
    return(
        <div className="game p-5 h-full w-full bg-indigo-950">
            
            <p className="bold p-5">
                <span className="bold text-yellow-400 text-3xl">Pontuação: {score}</span>
            </p>

            <h1 className="p-1 text-3xl">Adivinhe a palavra</h1>

            <h3 className="p-3 tip">Dica sobre a palavra: <span className="p-2 text-yellow-500">{pickedCategory}</span></h3>
            <p>Você tem {guesses} tentavivas</p>

            <div className="flex items-center p-3 h-40 border-[15px] border-amber-400">
                {letters.map((letter: string, i: number) => (
                    guessedLetters.includes(letter) ? (
                        <span className="border-2 border-black bg-white text-7xl text-black uppercase h-[100px] w-[100px]" key={i}>{letter}</span>

                    ) : (
                        <span className="border-2 border-black bg-white text-7xl text-black uppercase h-[100px] w-[100px]" key={i}></span>
                    )
                ))}
            </div>

            <div className="p-5">
                <p className="mb-[1.2em]">Tente adivinhar a letra da palavra</p>

                <form className="flex justify-center items-center">
                    <input className="text-4xl text-center h-[50px] uppercase
                     w-[50px] mr-10 text-black" type="text" name="letter" maxLength={1} required />
                    <Button onClick={verifyLetter} title="Jogar"/>
                </form>
            </div>

            <div>
                <p>Letras já utilizadas: </p>
                {wrongLetters.map((letter: string, i: number) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    )
}