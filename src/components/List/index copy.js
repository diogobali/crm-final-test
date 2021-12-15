import React, { useState } from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card';
import { useDrag, useDrop } from 'react-dnd';
import { Container } from './styles';
import { useUserContext } from '../../contexts/userContext';
import { useModalContextAddNewLead} from '../Modal/modalAddNewLead.context';
import { isShorthandPropertyAssignment } from 'typescript';
import { useSelectedSellers } from '../crm_filter/selectedSellers.context';


export default function List({ title, data, index: listIndex, adm, sendAdm, isAdmAction, isRegularizarAction, hasStatus, isScheduled, isWaitingCancel}){

    const { userData, setUserData } = useUserContext();
    const { selectedSellers, setSelectedSellers } = useSelectedSellers({});

    const { openModalAddNewLead } = useModalContextAddNewLead();
    const openModalAddNewLeads = (userData) => openModalAddNewLead({ message: 'Adicionar Novo Lead', userData: userData});

    var aux = 0;
    
    return(
        <Container adm={adm} sendAdm={sendAdm} userData={userData} isAdmAction={isAdmAction} isRegularizarAction={isRegularizarAction} hasStatus={hasStatus} isScheduled={isScheduled} isWaitingCancel={isWaitingCancel}>
            <header>
                <h2>{title}</h2>
                {listIndex == 0 &&
                    <button
                        type="button"
                        onClick={openModalAddNewLeads}
                    >+</button>
                }
                
            </header>
            <ul>
                    { data.map((card, index) => {                    
                        if(card.status == listIndex){
                            if(aux == 0){
                                aux = 1;
                            }
                            const isTeamExists = selectedSellers.some(item => item.owner === card.owner)
                            if(isTeamExists){
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
                                        hasStatus={hasStatus}
                                        isScheduled={isScheduled}
                                        isWaitingCancel={isWaitingCancel}
                                    />
                                ) 
                            }
                            
                        }
                    })
                }   
                {   
                aux == 0 && 
                <Card 
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