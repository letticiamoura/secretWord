import Button from "../layout/Button";

export default function StartScreen({startGame}:any) {
    return(

        <div className="h-full w-full p-10 bg-indigo-950">

            <h1 className="text-4xl mb-12">Secret Word</h1>
            <p className="mb-12 text-yellow-500">Clique no botão para começar</p>
            <Button onClick={startGame} title="Começar" />
        </div>
    )
}