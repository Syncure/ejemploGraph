import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!) {
        eliminarProducto(id: $id)
    }
`;

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

const Producto = ({ productos }) => {

    // Destructior productos
    const { id,nombre, existencia, precio } = productos;

    // Utilizar Mutation
    const [ eliminarProducto ] = useMutation(ELIMINAR_PRODUCTO, {
        update(cache) {
            // Obtener una copia del objeto de cache
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS });

            // Reescribir el cache
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos : obtenerProductos.filter( obtenerProductos => obtenerProductos.id !== id)
                }
            })
        }
    });

    // Eliminar Producto
    const confirmarEliminarProducto = async () => {
        
            //   console.log('eliminando', id);
                try {
                    // Eliminar por ID
                    const { data } = await eliminarProducto({
                        variables:{
                            id: id
                        }
                    })

                } catch (error) {
                    console.log(error.message); 
                }

    }
          
    

    const editarCliente = () => {
        Router.push({
            pathname:'/editarproducto/[id]',
            query:{ id }
        })
    }
    
    return (
        <tr>
            <td >{nombre}</td>
            <td >{existencia}</td>
            <td >{precio}</td>
            <td >
                <button
                    type="button"
                    onClick={() => confirmarEliminarProducto()}
                >
                    eliminar
                </button>
                
            </td>
            <td >
                <button
                    type="button"
                    onClick={() => editarCliente()}
                >
                    editar
                </button>
                
            </td>
        </tr>
    )
}

export default Producto
