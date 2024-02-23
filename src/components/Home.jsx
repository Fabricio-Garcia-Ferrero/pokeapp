import Dashboard from "./Dashboard";
import { React, useEffect, useState } from "react";
import Logo from '../assets/Logo.png';

function Home(){ 

    return<>
        <Dashboard/>
        <div style={{ textAlign: 'center' }}>
        <img
        src={Logo}
        alt="Descripción de la imagen"
        style={{ width: '50%', height: 'auto', display: 'block', margin: 'auto' }}
      />
        </div>
    </>
}

export default Home;