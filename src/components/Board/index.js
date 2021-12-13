import React, { useState, useEffect } from 'react';
import BoardContext from './context';
import produce from 'immer';
import { useUserContext } from '../../contexts/userContext';
import List from '../List';





import { LoadLists } from '../../services/api';

import { Container } from './styles';
import { useSelectedSellers } from '../crm_filter/selectedSellers.context';

const data = LoadLists()

export default function Board(props){

    const data2 = props.dadosleads

    const { userData, setUserData } = useUserContext();

    const [lists, setLists] = useState(Object.values(data2));

    useEffect(() => {
        setLists(data2)
    }, []);

    const dataOk = Object.values(data2);

    const { selectedSellers, setSelectedSellers } = useSelectedSellers({});



    function move(fromList, toList, from, to){
        
        
    }
    

    return(
        <BoardContext.Provider value={{ dataOk, move }}>
            <Container>
                {/* {dataOk.map((list, index) => <List key="A contatar" index={index} data={list}/>)} */}
                {(userData.user.perfil === '0' || userData.user.perfil === '1') &&
                <>
                    <List title="A contatar" index="0" data={dataOk}/>
                    <List title="Agendamento" index="1"data={dataOk} isScheduled={true}/>
                    <List title="Informações coletadas" index="2"data={dataOk}/>
                    <List title="Orçamento Enviado / Ag. Retorno" index="3" data={dataOk}/>
                    <List title="Ag. Documento" index="4" data={dataOk} sendAdm={true}/>
                </>
                }   
                
                <List title="Ag. Cancelamento" index="10" data={dataOk} isWaitingCancel={true}/>
                <List title="Documentos em análise" index="5" data={dataOk} adm={true} isAdmAction={true} />
                <List title="Em implantação" index="6" data={dataOk} adm={true} hasStatus={true}/>
                <List title="Implantados" index="9" data={dataOk} adm={true} />
                <List title="Com pendência" index="7" data={dataOk} isRegularizarAction={true} />
                {userData.user.perfil === '0' || userData.user.perfil === '1' &&
                 <List title="Lead Declinado" index="8" data={dataOk} />
                }
            </Container>
        </BoardContext.Provider>
    );
}