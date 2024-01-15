import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from './Pokemoncard.module.css';

function Pokemoncard({id}) {
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
        <>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                    <p>{pokemon.name}</p>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    <p><strong>Moves:</strong> {pokemon.moves.length}</p>
                    <p><strong>Weight: </strong>{pokemon.weight}</p>
                    <p>Abilities: </p>
                    <ul>
                        {pokemon.abilities.map((ab, index) => (
                            <li key={index}>{ab.ability.name}</li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}

export default Pokemoncard;
