import Button from "../layout/Button";

export default function Game( {verifyLetter}:any ) {
    return(
        <div>
            <h1 className="p-10">Game</h1>
            <Button onClick={verifyLetter} title="Finalizar jogo"/>
        </div>
    )
}