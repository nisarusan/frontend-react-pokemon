import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokemoncard from "../../component/Pokemon/Pokemoncard.jsx";

function Home() {
    const [pokeMon, setPokeMonData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const limit = 20;
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchPokemon() {
            setError(false);
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
                );
                setPokeMonData(response.data.results);
                setTotalCount(response.data.count);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        }
        fetchPokemon();
    }, [offset]);

    const handleNextClick = () => setOffset((previousOffSet) => previousOffSet + limit);
    const handlePreviousClick = () =>
        setOffset((prevOffset) => Math.max(0, prevOffset - limit));

    const isPreviousDisabled = () => offset === 0;
    const isNextDisabled = offset + limit >= totalCount;
    return (
        <>
            {error ? (
                <h1>Er is een fout opgetreden: ${error}</h1>
            ) : (
                <main>
                    <h1>Gotta catch 'em all!</h1>
                    <ul>
                        {pokeMon.length > 0 &&
                            pokeMon.map((pokemon, index) => (
                                <li key={index} className="pokemon">
                                    <Pokemoncard
                                        name={pokemon.name}
                                        id={pokemon.url.split("/")[6]}
                                        key={index}
                                    />
                                </li>
                            ))}
                    </ul>
                    <button onClick={handlePreviousClick} disabled={isPreviousDisabled()}>
                        Previous
                    </button>
                    <button onClick={handleNextClick} disabled={isNextDisabled}>
                        Next
                    </button>
                </main>
            )}
        </>
    );
}

export default Home;
