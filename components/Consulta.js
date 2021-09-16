import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Producto from './Producto';


const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            existencia
            precio
        }
    }
`;


const Consulta = () => {

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    if(loading) return 'Cargando...';
   

    const { obtenerProductos } = data;

    return (
        <div>
            <h1> Productos </h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Eliminar</th>
                        <th>Editar</th>
                    </tr>
                </thead>

                <tbody>
                    
                        {obtenerProductos.map(producto => (
                        <Producto 
                            key={producto.id}
                            productos={producto}
                        />  
                        ))}
                        
                    
                </tbody>
            </table>
        </div>
    )
}

export default Consulta
