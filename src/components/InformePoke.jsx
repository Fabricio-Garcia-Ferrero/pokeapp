import MaterialTable from "@material-table/core";
import { Button } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { collection, doc, getDocs, getDoc, query, where, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";

function InformePoke(){

    const intercambiarFavorito = async (rowData) => {
        const pokemonRef = doc(db,"Pokemons", rowData.id);
        const pokemon = await getDoc(pokemonRef);

        if(pokemon.exists()){
            const updatePoke = {
                fav: !rowData.fav,
            }

            await updateDoc(pokemonRef,updatePoke);
        };
    }


    const cols = [
        {
            title: "ICONO",
            render: (rowData) => (
                <img
                    src={`/minicons/${rowData.id}.png`}
                    style={{width:50, height:50}}
                    alt={`Icono ${rowData.nombre}`}
                />
            ),
            sorting: false,
        },
        {title:"ID", field: "id"},
        {title:"NOMBRE", field:"nombre"},
        {title:"GENERACIÓN", field:"generacion"},
        {title:"TIPO PRINCIPAL", field: "tipo1"}, 
        {title:"TIPO SECUNDARIO", field: "tipo2"},
        {
            title: "FAVORITO", 
            render: (rowData) => (
                <Button variant="outlined" onClick={() => intercambiarFavorito(rowData)}>
                    {rowData.fav ? <DoneOutlineIcon /> : <ClearIcon/>}
                </Button>
            ),
            sorting: false,
        },
        {
            title:"FICHA",
            render: (rowData) => (
                <a href={`/pokemon/${rowData.id}`}>
                    <Button>
                        <AssignmentIcon/>
                    </Button>
                </a>
              ),
              sorting: false,
        }
    ]

    const [data, setData] = useState([])
    useEffect(() => {
        const obtenerDatos = async () => {
            const pokemons = await getDocs(query(collection(db,"Pokemons")));
            const pokemonData = [];
            pokemons.forEach((doc) => {
                pokemonData.push({...doc.data(),id: doc.id})
            });
            setData(pokemonData);
        };

        const desconectar = onSnapshot(collection(db,"Pokemons"), (snapshot) => {
            obtenerDatos();
        });

        return () => desconectar();

    },[])

    return <>
        <MaterialTable
            columns={cols} data={data}
            title={
                <div style={{ fontWeight: 'bold', textDecoration: 'underline', color:'black' }}>
                    POKÉDEX
                </div>
            }
            options={{
                draggable: false,
                columnsButton: false,
                filtering: true,
                headerStyle: {backgroundColor: '#765252', color: 'white'},

            }}
            style={{ backgroundColor: 'white', color: 'red' }}
        />
    </>
}

export default InformePoke;