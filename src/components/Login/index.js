import React, { useState } from 'react'

import { useHistory } from 'react-router-dom';

import { useUserContext } from '../../contexts/userContext';

import { Container } from './styles'
import { domain } from 'process';

export default function Login(){

    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    const { userData, setUserData } = useUserContext();

    const optionsForm = {
        method: 'POST',
        body: JSON.stringify({
            user: user,
            password: password,
        })
    };

    let history = useHistory();
    const getUser= async (e) => {
        

        e.preventDefault();
        fetch("http://24.152.37.228/login/login.php", optionsForm)
        .then((response) => response.json())
        .then((responseJson) => {
            setUserData(Object.values(responseJson));
            const user = Object.values(responseJson)[0];
            console.log(user);
            localStorage.setItem('user', JSON.stringify(
                user
            ));
            history.push("/crm");
            });
    }  

    return(
        <Container >
        <div className="login">
            
            <div>
            <h1>Acesso ao sistema CRM</h1>
            <form onSubmit={getUser}>
                <input
                    type="text"
                    name="user"
                    placeholder="Usuario"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                >Entrar</button>
            </form>
            </div>
        </div>
        </Container>
    )

}