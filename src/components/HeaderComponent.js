import react, { useState } from 'react';

import logoImg from '../assets/images/moplan.svg';

import '../styles/header-component.scss';
import { NotificationIcon } from './Notification-Icon';

import { useUserContext } from '../contexts/userContext';

import { useHistory } from 'react-router-dom';
import { NotificationBar } from './Notification-Bar';


export function HeaderComponent(){

    let history = useHistory();

    const { userData, setUserData } = useUserContext();

    const [ notificationBarisVisible, setNotificationBarIsVisible] = useState(false);

    const openNotifications = () => {
        if(notificationBarisVisible === true){
            setNotificationBarIsVisible(false);
        } else {
            setNotificationBarIsVisible(true);
        }
    }

    const logout = () => {
        localStorage.clear('user');
        setUserData(null);
        history.push('/login');
    }

    return(
        <header className="header-bar">
                <div className="content">
                    <img src={logoImg} alt="Moplan Plataform"/>
                    <div className="navBar">
                        <nav>
                            <ul>
                                <li><a href="https://moplanseguros.com.br/loginpage.php">Banca de Leads</a></li>
                            </ul>
                        </nav>
                        <>
                        <div className="notifications">
                            <NotificationIcon function={openNotifications} />
                            <NotificationBar visible={notificationBarisVisible}/>
                        </div>
                        <div className="header-buttons">
                            <strong>{userData.user.name}</strong>
                            <button
                                type="button"
                                onClick={logout}
                            ><img src="../../logout.svg" alt="Logout" /></button>
                        </div>
                        </>


                    </div>
                    
                </div>
            </header>
    );
}