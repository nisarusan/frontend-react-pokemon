import React, { useEffect, useState } from "react";
import axios from "axios";

function Pokemoncard({ id }) {
    const [pokemon, togglePokemon] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemon() {
            setLoading(true); // Set loading to true when starting a new request
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                console.log(result.data);
                togglePokemon(result.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
    }, [id]);
    return (
        <div>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                    <p>{pokemon.name}</p>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>{pokemon.moves.length}</p>
                    <p>{pokemon.weight}</p>
                    <ul>
                        <p>Abilities: </p>
                        {pokemon.abilities.map((ab, index) => (
                            <li key={index}>{ab.ability.name}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Pokemoncard;
