import Button from "../layout/Button";

export default function StartScreen({startGame}:any) {
    return(

        <div className="h-full w-full p-10 bg-indigo-950">

            <h1 className="pt-10 text-5xl md:text-6xl font-rubik font-bold mb-12">S e c r e t

                <br /> 

                <span className="md:text-8xl text-5xl font-rubik text-yellow-500">W o r d</span> 
            </h1>

            <Button onClick={startGame} title="Começar" />

        </div>
    )
}