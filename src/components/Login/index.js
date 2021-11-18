import React, { useState } from 'react'

import { useHistory } from 'react-router-dom';

import { useUserContext } from '../../contexts/userContext';

import { Container } from './styles'
import { domain } from 'process';
import { networkInterfaces } from 'os';
import { tsTypeLiteral } from '@babel/types';

export default function Login(){

    const [user, setUser] = useState();
    const [password, setPassword] = useState();

    const [loginStatus, setLoginStatus]  = useState();

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
        fetch("https://moplanseguros.com.br/login/login.php", optionsForm)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === "false"){
                history.push("/login");
                setLoginStatus("fail");
            } else {
                setLoginStatus("success");
                const now = new Date()
                const expiry = now.getTime() + 720000;
                setUserData(Object.values(responseJson));
                const user = Object.values(responseJson)[0];
                console.log(user);
                localStorage.setItem('user', JSON.stringify({
                    user: user,
                    expiry: expiry
                }));
                console.log(userData)
                history.push("/crm");
            }
            });
    }  

    return(
        <Container >
        <div className="login">
            
            <div>
            <h1>Acesso ao sistema CRM</h1>
            {loginStatus === "fail" &&
                <div>
                    <span className="message fail">Usuário ou senha incorretos.</span>
                </div>
            }
            {loginStatus === "success" &&
                <div>
                    <span className="message success">Login realizado com sucesso.</span>
                </div>
            }
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