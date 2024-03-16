import { useState, useEffect} from "react";

import Confetti from 'react-confetti';

import Button from "../layout/Button";

import dog from "../assets/dog.jpg";
import dog1 from "../assets/dog1.jpg";
import dog2 from "../assets/dog2.jpg";

const dogs = [
    {id: 1, img: dog},
    {id: 2, img: dog1},
    {id: 3, img: dog2},
]

export default function GameOver( {retry, score}:any ) {
    const [currentDogIndex, setCurrentDogIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDogIndex((prevIndex) => (prevIndex + 1) % dogs.length);
        }, 10000); 
        return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
    }, []);
    return(
        <div>
            <h1 className="p-5 font-bold text-3xl">Fim de Jogo</h1>
            <h2 className="p-3">A sua pontuação foi: <span className="text-yellow-500">{score}</span></h2>
            <Confetti numberOfPieces={200} />
            <img
                key={currentDogIndex}
                src={dogs[currentDogIndex].img}
                alt="Dogs"
                className="lg:h-[50vh] lg:w-[20vw] h-[35vh] w-[50vw] ml-4 sm:h-[50vh] rounded-lg"
            />
            <Button onClick={retry} title="Recomeçar jogo" />
        </div>
    )
}