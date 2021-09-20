import React, { useState } from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card';
import { useDrag, useDrop } from 'react-dnd';
import { Container } from './styles';
import { useUserContext } from '../../contexts/userContext';


export default function List({ title, data, index: listIndex, adm, sendAdm, isAdmAction, isRegularizarAction}){

    const { userData, setUserData } = useUserContext();

    var aux = 0;

    return(
        <Container adm={adm} sendAdm={sendAdm} userData={userData} isAdmAction={isAdmAction} isRegularizarAction={isRegularizarAction}>
            <header>
                <h2>{title}</h2>
            </header>

            <ul>
                    { data.map((card, index) => {                    
                        if(card.status == listIndex){
                            if(aux == 0){
                                aux = 1;
                            }
                            return(
                            <Card 
                                key={card.id}
                                index={index} 
                                data={card}
                                listIndex={listIndex}
                                button={data?.button}
                                status={card.status}
                                sendAdm={sendAdm}
                                isAdmAction={isAdmAction}
                                isRegularizarAction={isRegularizarAction}
                            />
                            )
                        }
                    }

                    )}  
                    {
                        aux == 0 && <Card 
                                        key={0}
                                        index={0} 
                                        data={0}
                                        listIndex={listIndex}
                                        className="cardExample"
                                    />
                    }
            </ul>

        </Container>
    );
}