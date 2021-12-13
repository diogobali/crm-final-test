
import react, { useCallback, useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { Container } from './styles';
import { useHistory } from 'react-router-dom';
import './styles.js'
import { useSelectedSellers } from './selectedSellers.context';
import { SELECTION_ALL } from 'antd/lib/table/hooks/useSelection';
import { FilterIcon } from './icon';


export function CrmFilter(){

    const { userData, setUserData } = useUserContext();
    const { selectedSellers, setSelectedSellers } = useSelectedSellers({});
    const { isFilterVisible, setIsFilterVisible } = useSelectedSellers({});

    const [ sellers, setSellers ] = useState([]);

    async function fetchApi () {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                team: userData.user.team,
            })
        };
        const response = await fetch("https://moplanseguros.com.br/getsellersfromteam.php", optionsForm)
        const json = await response.json()
        setSellers(json);
        json.users.map(item => {
            item.map(item => {
                setSelectedSellers((prevState) => [
                    ...prevState,
                    {
                        owner: item[2]
                    }
                ])
            })
            
        })
    }

    function changeSelected(e) {   
        if(e.checked){
            setSelectedSellers((prevState) => [
                ...prevState,
                {
                    owner: e.value
                }
            ])
        } else {
            console.log(selectedSellers)
            removeSelectedSeller(e.value)
        }
    }
    const removeSelectedSeller = useCallback(
        (owner) => {
            setSelectedSellers(selectedSellers.filter((c) => c.owner !== owner));
        },
        [selectedSellers]
    );

    const [ selectAll, setSelectAll ] = useState(true)

    function handleSelectAll(){
        var lista = document.querySelectorAll("input[name=sellersCheckbox]")
        if(selectAll){
            setSelectAll(false)
            setSelectedSellers((prevState) => [
                {
                    owner: 'null'
                }
            ])
            for(var i = 0; i < lista.length; i++)
            {
                lista[i].checked = false
            }
        } else {
            setSelectAll(true)
            sellers.users.map(item => {
                item.map(item => {
                    setSelectedSellers((prevState) => [
                        ...prevState,
                        {
                            owner: item[2]
                        }
                    ])
                })
                
            })
            for(var i = 0; i < lista.length; i++)
            {
                lista[i].checked = true
            }
        }
    }
    useEffect(() => {
        fetchApi();
    },[])

    return(
        <Container>
            
        
        
        <div className="aroundAll">
            <FilterIcon />
            {isFilterVisible === true &&
            <div className="crm-filter">
                <ul>
                    <li>
                        <input
                            type="checkbox"
                            id="selectAll"
                            onChange={
                                (e) => {
                                    handleSelectAll(e.target)
                                }
                            }
                            checked={selectAll}

                        />

                        <label
                            for="selectAll"
                        >
                            Selecionar/Remover todos
                        </label>
                    </li>
                    {
                        sellers.users &&
                        sellers.users.map(item => {
                            return(
                                item.map(item => {
                                    return(
                                        <li>
                                            <input 
                                                type="checkbox"
                                                id={item[2]}
                                                onChange={
                                                    (e) => {
                                                        changeSelected(e.target) 
                                                    }
                                                }
                                                value={item[2]}
                                                defaultChecked
                                                name="sellersCheckbox"          
                                            />
                                            <label
                                                for={item[2]}
                                            >{
                                              item[1].split(' ')[0] + ' ' + item[1].split(' ')[1]  
                                            }</label>
                                        </li>
                                    )
                                })
                            )
                        })
                    }
                    
                </ul>
            </div>
            }
        </div>

        </Container>
    );
}