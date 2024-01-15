import React, {useEffect, useState} from "react";
import axios from "axios";
import Pokemoncard from "../../component/Pokemon/Pokemoncard.jsx";

function Home() {
    const [pokeMon, setPokeMonData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const limit = 20;
    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
                setPokeMonData(response.data.results);
                setTotalCount(response.data.count);
                // const responsePokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            } catch (e) {
                console.error(e);
            }
        }
        fetchPokemon();
    }, [offset]);

    const handleNextClick = () => {
        setOffset((previousOffSet) => previousOffSet + limit);
        console.log("U heeft geklikt");
    }
    const isNextDisabled = offset + limit >= totalCount;
    return (
        <>
            <h1>Gotta catch 'em all!</h1>
            {pokeMon.length > 0 &&
                pokeMon.map((pokemon, index) => {
                    return <div key={index}>
                        <Pokemoncard name={pokemon.name} id={pokemon.url.split("/")[6]} />

                    </div>
                })}
            <button onClick={handleNextClick} disabled={isNextDisabled}>Next</button>

        </>
    )
}

export default Home;