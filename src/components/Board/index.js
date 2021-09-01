import React, { useState, useEffect } from 'react';
import BoardContext from './context';
import produce from 'immer';

import List from '../List';





import { LoadLists } from '../../services/api';

import { Container } from './styles';

const data = LoadLists()

export default function Board(props){

    const data2 = props.dadosleads

    const [lists, setLists] = useState(Object.values(data2));

    useEffect(() => {
        setLists(data2)
    }, [{}]);


    const dataOk = Object.values(lists);


    function move(fromList, toList, from, to){
        
        
    }

    


    return(
        <BoardContext.Provider value={{ dataOk, move }}>
            <Container>
                {/* {dataOk.map((list, index) => <List key="A contatar" index={index} data={list}/>)} */}
                <List title="A contatar" index="0" data={dataOk}/>
                <List title="Agendamento" index="1"data={dataOk}/>
                <List title="Informações coletadas" index="2"data={dataOk}/>
                <List title="Orçamento Enviado / Ag. Retorno" index="3" data={dataOk}/>
                <List title="Ag. Documento" index="4" data={dataOk} sendAdm={true}/>
                <List title="Com Administrativo" index="5" data={dataOk} adm={true} />
                <List title="Implantados" index="6" data={dataOk} adm={true} />
                <List title="Venda Declinada" index="7" data={dataOk} adm={true} />
                <List title="Lead Declinado" index="8" data={dataOk} />
            </Container>
        </BoardContext.Provider>
    );
}