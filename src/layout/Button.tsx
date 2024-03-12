
type button = {
    title: string,
    onClick: () => void,
}
export default function Button( {title, onClick}:button ) {
    return(
        <div>
            <button onClick={onClick} className="p-2 border-2 hover:border-sky-600/75 rounded transition ease-out hover:scale-110">{title}</button>
        </div>
    )
}