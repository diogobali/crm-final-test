import logoImg from '../assets/images/moplan.svg';
import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom'
import '../styles/header-component.scss';

import { useUserContext } from '../contexts/userContext';

import { useHistory } from 'react-router-dom';


export function HeaderComponent(){

    let history = useHistory();

    const { userData, setUserData } = useUserContext();

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
                                <li><a href="https://moplanseguros.com.br/bancadeleads.php">Banca de Leads</a></li>
                            </ul>
                        </nav>
                        <div className="header-buttons">
                            <strong>{userData.name}</strong>
                            <button
                                type="button"
                                onClick={logout}
                            ><img src="../../logout.svg" alt="Logout" /></button>
                        </div>


                    </div>
                    
                </div>
            </header>
    );
}