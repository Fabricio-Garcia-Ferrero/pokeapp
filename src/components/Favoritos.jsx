import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { collection, doc, getDocs, getDoc, query, where, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Button, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function Favoritos(){

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const obtenerPokemonsFav = async () => {
            const q = query(collection(db,"Pokemons"), where("fav","==",true));
            const pokefavs = await getDocs(q);

            const data = [];
            pokefavs.forEach((doc) => {
                data.push({id: doc.id, ...doc.data()});
            });

            setPokemons(data);
        };
        obtenerPokemonsFav();
    }, [])

    const handleEliminarFavorito = async (pokemonId) => {
        const pokemonRef = doc(db, "Pokemons", pokemonId);
        await updateDoc(pokemonRef, { fav: false });

        setPokemons((prevPokemons) => prevPokemons.filter(pokemon => pokemon.id !== pokemonId));
    };

    console.log(pokemons)
    return<>
        <Dashboard/>
        <Paper style={{ backgroundColor: '#ECECEC', padding: '20px' }}>
        <h2 align="center">Lista de pokemons favoritos</h2>
        {pokemons.length === 0 ? (
                <h3 align="center">No hay pokémons favoritos</h3>
            ) : (
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", margin: "20px" }}>
                    {pokemons.map((pokemon) => (
                        <div key={pokemon.id} style={{ textAlign: "center" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <img src={`icons/${pokemon.id}.png`} alt={pokemon.nombre} />
                                <a href={`/pokemon/${pokemon.id}`}><Button variant="outlined">{pokemon.nombre}</Button></a>
                                <Button onClick={() => handleEliminarFavorito(pokemon.id)}><DeleteIcon /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Paper>
        <h6 align="center">Fabricio García Ferrero 2ºDAM</h6>
    </>
}
export default Favoritos;