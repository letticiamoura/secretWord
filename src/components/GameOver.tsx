import Button from "../layout/Button";

export default function GameOver( {retry}:any ) {
    return(
        <div>
            <h1>Game Over</h1>
            <Button onClick={retry} title="Recomeçar jogo"/>
        </div>
    )
}