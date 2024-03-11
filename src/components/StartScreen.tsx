export default function StartScreen() {
    return(

        <div className="h-full w-full p-10 bg-indigo-950">

            <h1 className="text-4xl mb-12">Secret Word</h1>
            <p className="mb-12 text-yellow-500">Clique no botão para começar</p>
            <button className="p-2 border-2 hover:border-sky-600/75 rounded transition ease-out hover:scale-110">Começar</button>

        </div>
    )
}