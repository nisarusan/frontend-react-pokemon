import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Pokemoncard from "./component/Pokemoncard.jsx";

function App() {
    const [pokeMon, setPokeMonData] = useState([]);
    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');
                setPokeMonData(response.data.results);
            } catch(e){
                console.error(e);
            }
        }
        fetchPokemon();
    }, []);

    return (
        <>
            <h1>Gotta catch 'em all!</h1>
            {pokeMon.length > 0 &&
                pokeMon.map((pokemon, index) => {
                    return <Pokemoncard key={index} name={pokemon.name} url={pokemon.url} />
                })}
        </>
    );
}

export default App
