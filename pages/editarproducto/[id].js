import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';

const OBTENER_PRODUCTOS_ID = gql`
    query obtenerProducto($input: ID!) {
        obtenerProducto(id: $input) {
            nombre
            existencia
            precio
        }
    }

`;

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            precio
            existencia
        }
    }
`;

const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($id: ID!, $input: ProductoInput!) {
        actualizarProducto(id: $id, input: $input) {
            nombre
            existencia
            precio
        }
    }`
  ;

const EditarProducto = () => {

    const router = useRouter();
    const { query: { id } } = router;

    // Consultar producto por ID
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS_ID,{
        variables: {
            input: id
        }
    });

    // Editar producto
    const [ actualizarProducto ] = useMutation(ACTUALIZAR_PRODUCTO,
        {
            update(cache, { data: { actualizarProducto } }) {
                // Actualizar Producto
                const { obtenerProductos } = cache.readQuery({
                    query: OBTENER_PRODUCTOS
                });

                const productosActualizados = obtenerProductos.map(producto =>
                    producto.id === id ? actualizarProducto : producto
                  );

        
                // Actualizar Producto Actual
                cache.writeQuery({
                    query: OBTENER_PRODUCTOS,
                    variables: { id },
                    data: {
                        obtenerProductos : productosActualizados
                    }
                });
            }
      }
    );
    if(loading) return "Cargando...";

    // Validar Formulario
    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('Nombre del producto obligatorio'),
        existencia: Yup.number().typeError('Debe ser un número', NaN).required('Stock del producto obligatorio'),
        precio: Yup.number().typeError('Debe ser un número', NaN).required('Precio del producto obligatorio'),
    })

    const { obtenerProducto } = data; 

    const editarProducto = async valores => {
        const { nombre, existencia, precio } = valores;

        try {
            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre,
                        existencia,
                        precio
                    }
                }
            });
            // console.log(data);
    
            // Redireccionar
            router.push('/')
        } catch (error) {
            console.log(error.message);
        }
        
    }

    return (
        <div>
            <h1>Editar Producto</h1>

            <Formik
                validationSchema={ schemaValidacion }
                enableReinitialize
                initialValues={ obtenerProducto }
                onSubmit = {valores => editarProducto(valores)}
            >
                {props =>{
                    return (
                            <form 
                                
                                onSubmit={props.handleSubmit}
                            >
                                <div >
                                        <label >
                                            Nombre               
                                        </label>
                                        <input 
                                            id = "nombre"
                                            type = "text"
                                            placeholder="Nombre Producto"
                                            value = { props.values.nombre }
                                            onChange = { props.handleChange }
                                            onBlur = { props.handleBlur }
                                        />
                                </div>

                                
        

                                <div >
                                        <label >
                                            Stock               
                                        </label>
                                        <input 
                                            id = "existencia"
                                            type = "number"
                                            placeholder="Stock Producto"
                                            value = { props.values.existencia }
                                            onChange = { props.handleChange }
                                            onBlur = { props.handleBlur }
                                        />
                                </div> 

                                 

                                <div >
                                        <label >
                                            Precio               
                                        </label>
                                        <input 
                                            id = "precio"
                                            type = "number"
                                            placeholder="Precio Producto"
                                            value = { props.values.precio }
                                            onChange = { props.handleChange }
                                            onBlur = { props.handleBlur }
                                        />
                                </div>   

                                
                                <input 
                                    type="submit"
                                    value="Editar Producto"
                                />
                            </form>   
                    )
                }}
            </Formik>
        </div>
    )
}

export default EditarProducto
