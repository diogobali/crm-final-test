
import react, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { Container } from './styles';
import { useHistory } from 'react-router-dom';
import './styles.js'


export function NotificationBar(props){

    const { userData, setUserData } = useUserContext();

    const [ notifications, setNotifications ] = useState([]);

    const optionsForm = {
        method: 'POST',
        body: JSON.stringify({
            leadId: userData.user.id
        })
    };

    const optionsForm2 = {
        method: 'POST',
        body: JSON.stringify({
            leadId: userData.user.id,
            visualized: '1'
        })
    };

    async function fetchApi () {
        counterApi = 1;
        const response = await fetch("https://moplanseguros.com.br/getnotificacoes.php", optionsForm)
        const json = await response.json()
        .then(await fetch("https://moplanseguros.com.br/getnotificacoes.php", optionsForm2))
        
        setNotifications(json);
        
        
    }

    var counterApi = 0;
    useEffect(() => {
        if(counterApi == 0){
            fetchApi();
        }
    },[props.visible])
    

    const teste = () => {
        fetchApi();
    }
    
    return(
        <Container>
        <div>
        {props.visible === true &&
        <div className="notification-bar">
           <ul>
               <button type="button" onClick={teste}>Recarregar</button>
               {notifications.sort((a,b) => a.visualized > b.visualized ? 1 : -1).map(notificacao => {
                   return(
                       <li className={notificacao.visualized === '1' ? 'visualized' : ''}>{notificacao.message}</li>
                   )
               })}
           </ul>
        </div>
        }
        </div>
       
                        
        </Container>
    );
}