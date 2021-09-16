import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from "@apollo/client";

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
        token
    }
}`;

const Consulta = () => {

    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null) 

    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { data } = await autenticarUsuario({
                variables:{
                    input: { 
                        email,
                        password
                    }
                }
            }) 
            
            const { token } = data.autenticarUsuario
            console.log(token);
        } catch (error) {
            console.log(error.message);
        }
         
    }

    return (
        <div className="w-full max-w-sm">

            <h1>AUTENTIFICAR</h1>

                        <form
                            onSubmit={handleSubmit}
                        >
                            <div >
                                <label>
                                    Email                
                                </label>
                                <input 
                                    id = "email"
                                    type = "email"
                                    placeholder="Email Usuario"
                                    value = { email }
                                    onChange = { e => setEmail(e.target.value) }
                                />
                            </div>

                            

                            <div >
                                <label>
                                    Password               
                                </label>
                                <input 
                                    
                                    id = "password"
                                    type = "password"
                                    placeholder = "Password Usuario"
                                    value = { password }
                                    onChange = { e => setPassword(e.target.value) } 
                                />
                            </div>

                            

                            <input 
                                type="submit" 
                                value="Iniciar Sesión"    
                            />
                        </form>
                    </div>
    )
}

export default Consulta
