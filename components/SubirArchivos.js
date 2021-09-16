import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from "@apollo/client";

const SUBIR_IMAGE = gql`
    mutation singleUpload($input: Upload!) {
        singleUpload(file: $input) {
            url
        }
    }
`;

const SubirArchivos = () => {
    
    const [subirArchivo] = useMutation(SUBIR_IMAGE,{
        onCompleted: data => console.log(data)
    });

    const [ image, setImage ] = useState(null);

    const subirImagen = async e => {
        e.preventDefault();

        if( !image ) return null;
        
        console.log(image);
        
        try {
            const { data } = await subirArchivo({
                variables: {
                    input: image
                }
            }) 
            console.log(data);
        } catch (error) {
            console.log(error);
        }   
    }


    return (
        <div>
            <input type="file" onChange={e => setImage(e.target.files) }/> 
            <button
                onClick={ subirImagen }
            >Enviar al backend</button>
        </div>
    )
}

export default SubirArchivos
