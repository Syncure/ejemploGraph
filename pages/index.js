import React from 'react';
import Consulta from '../components/Consulta';
import AutentificarUsuario from '../components/AutentificarUsuario';
import SubirArchivos from '../components/SubirArchivos';


const index = () => {
  return (
    <div>
        <h1>Hola</h1>
        <SubirArchivos />
        <AutentificarUsuario />
        <Consulta />
    </div>
  )
}

export default index
