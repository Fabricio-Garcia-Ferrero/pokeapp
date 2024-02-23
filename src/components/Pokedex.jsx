import Dashboard from "./Dashboard";
import { db } from "../config/firebase";
import { React, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import InformePoke from "./InformePoke";
import { Paper } from "@mui/material";

function Pokedex(){

    return<>
        
        <Dashboard/>
        <Paper style={{ backgroundColor: '#ECECEC', padding: '20px' }}>
            <InformePoke/>
        </Paper>
        <h6 align="center">Fabricio García Ferrero 2ºDAM</h6>
    </>
}

export default Pokedex;