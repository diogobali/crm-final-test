
import react, { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { useSelectedSellers } from './selectedSellers.context';

import { useHistory } from 'react-router-dom';


export function FilterIcon(){
    const { isFilterVisible, setIsFilterVisible } = useSelectedSellers({});

    function changeIsVisible(){
        if(isFilterVisible){
            setIsFilterVisible(false)
        } else {
            setIsFilterVisible(true)
        }
    }

    return(
       
        <div className="header-buttons notifications">
            <button
                type="button"
                onClick={() => changeIsVisible()}
            ><img src="../../i-filter.svg" alt="Notificações"></img></button>
        </div>
                        

    );
}