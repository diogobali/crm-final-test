
import react, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';

import { useHistory } from 'react-router-dom';
import './styles.scss'


export function NotificationIcon(props){

    const { userData, setUserData } = useUserContext();

    const [ notifications, setNotifications ] = useState();

    const optionsForm = {
        method: 'POST',
        body: JSON.stringify({
            leadId: userData.user.id
        })
    };

    async function fetchApi () {
        const response = await fetch("https://moplanseguros.com.br/getnumberofnewnotifications.php", optionsForm)
        const json = await response.json();
        setNotifications(json[0].quantidade);
    }

    useEffect(() => {
        fetchApi();
    },[])


    const teste = () => {
        console.log(notifications)
    }

    return(
       
        <div className="header-buttons notifications">
            <button
                type="button"
                onClick={props.function}
            ><img src="../../i-notification.svg" alt="Notificações"></img></button>
            {notifications &&
                <span>{notifications}</span>
            }
            
        </div>
                        

    );
}