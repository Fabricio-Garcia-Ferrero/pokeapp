import React from "react"
import Dashboard from "./Dashboard"
import { db } from "../config/firebase";
import { collection, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const colores = {
  Normal:"#E3E3E3", 
  Lucha:"#FF7A4C", 
  Volador:"#9BE8FF", 
  Veneno:"#DA32FF", 
  Tierra:"#FFD97C", 
  Roca:"#837462", 
  Bicho:"#C0FF7C", 
  Fantasma:"#6058A7", 
  Acero:"#C3C3C3", 
  Fuego:"#D64343", 
  Agua:"#66C7FF", 
  Planta:"#7FFA82", 
  Eléctrico:"#E4E124", 
  Psíquico:"#FF40B4", 
  Hielo:"#40F6FF", 
  Dragón:"#DD94FF", 
  Siniestro:"#595A5A", 
  Hada:"#FD66FF", 
}

const resistencia = {
  4:"Muy Débil",
  2:"Débil",
  1:"Neutral",
  0.5:"Resistente",
  0.25:"Muy resistente"
}

function Datasheet(){

const {id} = useParams();

const [pokemonData, setPokemonData] = useState(null);

useEffect(() =>{
  const obtenerPokemon = async() => {
    try{
      const registroRef = doc(db, "Pokemons", id);
      const registro = await getDoc(registroRef);

      if(registro.exists){
        setPokemonData(registro.data());
      }else{
        console.log("El pokemon no existe");
      }
    }catch(err){
      console.error("Error al obtener los datos");
    }
  };
  obtenerPokemon();
},  [id]);

  if(!pokemonData){
    return<p>Cargando...</p>
  }

  const tipos = {
    Normal: 0, 
    Lucha: 1, 
    Volador: 2,
    Veneno: 3, 
    Tierra: 4,
    Roca: 5, 
    Bicho: 6, 
    Fantasma: 7, 
    Acero: 8, 
    Fuego: 9, 
    Agua: 10, 
    Planta: 11, 
    Eléctrico: 12, 
    Psíquico: 13, 
    Hielo: 14, 
    Dragón: 15, 
    Siniestro: 16, 
    Hada: 17,
    Ninguno: 18
}

  const debilidades = [
    [1,2,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1], //Normal
    [1,1,2,1,1,0.5,0.5,1,1,1,1,1,1,2,1,1,0.5,2], //Lucha
    [1,0.5,1,1,0,2,0.5,1,1,1,1,0.5,2,1,2,1,1,1], //Volador
    [1,0.5,1,0.5,2,1,0.5,1,1,1,1,0.5,1,2,1,1,1,0.5], //Veneno
    [1,1,1,0.5,1,0.5,1,1,1,1,2,2,0,1,2,1,1,1], //Tierra
    [0.5,2,0.5,0.5,2,1,1,1,2,0.5,2,2,1,1,1,1,1,1], //Roca
    [1,0.5,2,1,0.5,2,1,1,1,2,1,0.5,1,1,1,1,1,1], //Bicho
    [0,0,1,0.5,1,1,0.5,2,1,1,1,1,1,1,1,1,2,1], //Fantasma
    [0.5,2,0.5,0,2,0.5,0.5,1,0.5,2,1,0.5,1,0.5,0.5,0.5,1,0.5], //Acero
    [1,1,1,1,2,2,0.5,1,0.5,0.5,2,0.5,1,1,0.5,1,1,0.5], //Fuego
    [1,1,1,1,1,1,1,1,0.5,0.5,0.5,2,2,1,0.5,1,1,1], //Agua
    [1,1,2,2,0.5,1,2,1,1,2,0.5,0.5,0.5,1,2,1,1,1], //Planta
    [1,1,0.5,1,2,1,1,1,0.5,1,1,1,0.5,1,1,1,1,1], //Eléctrico
    [1,0.5,1,1,1,1,2,2,1,1,1,1,1,0.5,1,1,2,1], //Psíquico
    [1,2,1,1,1,2,1,1,2,2,1,1,1,1,0.5,1,1,1], //Hielo
    [1,1,1,1,1,1,1,1,1,0.5,0.5,0.5,0.5,1,2,2,1,2], //Dragón
    [1,2,1,1,1,1,2,0.5,1,1,1,1,1,0,1,1,0.5,2], //Siniestro
    [1,0.5,1,2,1,1,0.5,1,2,1,1,1,1,1,1,0,0.5,1], //Hada
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]  //Ninguno
  ]

  function calcular(tipo1, tipo2){
  
    const valorTipo1 = tipos[tipo1];
    const valorTipo2 = tipos[tipo2];

    const deb1 = debilidades[valorTipo1];
    const deb2 = debilidades[valorTipo2];

    const debTotal = deb1.map((valor,indice) => valor*deb2[indice])

    const result = {
      Normal:debTotal[0], 
      Lucha:debTotal[1], 
      Volador:debTotal[2],
      Veneno:debTotal[3], 
      Tierra:debTotal[4],
      Roca:debTotal[5], 
      Bicho:debTotal[6], 
      Fantasma:debTotal[7], 
      Acero:debTotal[8], 
      Fuego:debTotal[9], 
      Agua:debTotal[10], 
      Planta:debTotal[11], 
      Eléctrico:debTotal[12], 
      Psíquico:debTotal[13], 
      Hielo:debTotal[14], 
      Dragón:debTotal[15], 
      Siniestro:debTotal[16], 
      Hada:debTotal[17], 
    }

    return result;
  }

  const debs = calcular(pokemonData.tipo1,pokemonData.tipo2);

  async function obtenerIdPorNombre(nombrePokemon) {
    try {
      const pokemonRef = collection(db, "Pokemons");
      const q = query(pokemonRef, where("nombre", "==", nombrePokemon));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.size > 0) {
        const pokemonDoc = querySnapshot.docs[0];
        const idPokemon = pokemonDoc.id;
        
        return idPokemon;
      } else {
        console.log("No se encontró ningún Pokémon con ese nombre");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el ID del Pokémon:", error);
      return null;
    }
  }

  const handleChangePokePre = async () => {
    const idPre = await obtenerIdPorNombre(pokemonData.evopre);
    window.location.href = `/pokemon/${idPre}`;
  }

  const handleChangePokePost = async () => {
    const idPost = await obtenerIdPorNombre(pokemonData.evopost);
    window.location.href = `/pokemon/${idPost}`;
  }

return<>
 
    <Dashboard/>
      <Container style={{backgroundColor:'#D8D8D8', height:'140vh', display:'flex',justifyContent:'center',alignItems:'center', maxWidth:'100%', padding:'100px'}}>
      <a href={id > 1 ? `/pokemon/${id - 1}` : ''}><Button variant="contained" style={{width:'4%', height:'4%'}}><ArrowBackIcon/></Button></a>
      <Paper style={{backgroundColor:colores[pokemonData.tipo1], padding:40, width:800, border: '3px solid black', display:'flex',justifyContent:'center',alignItems:'center', textAlign:'center', position: 'relative'}}>
        <Paper style={{padding:40, width:750, border: '5px solid black'}}>
          <Grid container spacing={4}>
          <Grid item xs={12} sm container>
            <Grid item>
              <img src={`/icons/${id}.png`} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}/>
            </Grid>
            </Grid>
            <Grid item xs={12} sm container style={{ borderLeft: '1px solid #ccc' }}>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item> 
                  <h2>Nombre: {pokemonData.nombre}</h2>
                </Grid>
                <Grid item>
                  <h2>#{id} | {pokemonData.generacion} Gen.</h2>
                </Grid>
                <Grid item>
                  <h2>Categoría: {pokemonData.categoria}</h2>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} sm container style={{ borderRight: '1px solid #ccc' }}>
              <Grid item xs container direction='column' spacing={2}> 
                <Grid item>
                  <h2>Tipo 1: {pokemonData.tipo1}</h2>
                </Grid>
                <Grid item>
                  <h2>Tipo 2: {pokemonData.tipo2}</h2>
                </Grid>
                <Grid item>
                <Button variant="contained" style={{backgroundColor:'#FDAD3A'}} disabled={pokemonData.evopre === 'Ninguno'} onClick={handleChangePokePre}><h2 style={{ color: '#fff' }}>&#x2190;{pokemonData.evopre}</h2></Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}> 
                <Grid item>
                  <h2>Peso: {pokemonData.peso} kgs</h2>
                </Grid>
                <Grid item>
                  <h2>Altura: {pokemonData.altura} mts</h2>
                </Grid>
                <Grid item>
                <Button variant="contained" style={{backgroundColor:'#91D832'}} disabled={pokemonData.evopost === 'Ninguno'}><h2 style={{ color: '#fff' }} onClick={handleChangePokePost}>{pokemonData.evopost}&#x2192;</h2></Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br/>
          <TableContainer style={{ border: '1px solid black' }}>
            <Table aria-label="tabla">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center', backgroundColor: '#000000', color:'#FFFFFF'}}>Tipo</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center', backgroundColor: '#000000', color:'#FFFFFF'}}>Resistencia</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center', backgroundColor: '#000000', color:'#FFFFFF'}}>Tipo</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center', backgroundColor: '#000000', color:'#FFFFFF'}}>Resistencia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Acero</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Acero]}</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Agua</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Agua]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Bicho</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Bicho]}</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Dragón</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Dragón]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Eléctrico</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Eléctrico]}</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Fantasma</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Fantasma]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Fuego</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Fuego]}</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Hada</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Hada]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Hielo</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Hielo]}</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Lucha</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Lucha]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Normal</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Normal]}</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Planta</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Planta]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Psíquico</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Psíquico]}</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Roca</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Roca]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Siniestro</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Siniestro]}</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Tierra</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Tierra]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Veneno</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Veneno]}</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>Volador</TableCell>
                  <TableCell style={{ fontSize: 20, border: '1px solid black', textAlign: 'center'}}>{resistencia[debs.Volador]}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
      </Paper>
    </Paper>
    <a href={id < 151 ? `/pokemon/${+id + 1}` : ''}><Button variant="contained" style={{width:'4%', height:'4%'}}><ArrowForwardIcon/></Button></a>
    </Container>
</>
}

export default Datasheet;