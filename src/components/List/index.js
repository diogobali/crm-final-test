import React, { useState } from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card/index';
import { useDrag, useDrop } from 'react-dnd';
import { Container } from './styles';
import { useUserContext } from '../../contexts/userContext';
import { useModalContextAddNewLead} from '../Modal/modalAddNewLead.context';
import { isShorthandPropertyAssignment } from 'typescript';
import { useSelectedSellers } from '../crm_filter/selectedSellers.context';

import { useModalContext0 } from '../Modal/modal0.context';
import { useModalContext1 } from '../Modal/modal1.context';
import { useModalContext2 } from '../Modal/modal2.context';
import { useModalContext4 } from '../Modal/modal4.context';
import { useModalContextDeclined } from '../Modal/modalDeclined.context';


export default function List({ title, data, index: listIndex, adm, sendAdm, isAdmAction, isRegularizarAction, hasStatus, isScheduled, isWaitingCancel}){

    const { userData, setUserData } = useUserContext();
    const { selectedSellers, setSelectedSellers } = useSelectedSellers({});

    const { openModalAddNewLead } = useModalContextAddNewLead();
    const openModalAddNewLeads = (userData) => openModalAddNewLead({ message: 'Adicionar Novo Lead', userData: userData});

    var aux = 0;

    const { openModal0 } = useModalContext0();
    const openModalZero = (itemId) => openModal0({ itemId: itemId });

    const { openModal1 } = useModalContext1();
    const openModalUm = (itemId) =>  openModal1({ message: 'Modal 1', itemId: itemId });

    const { openModal2 } = useModalContext2();
    const openModalDois = (itemId) => openModal2({ message: 'Modal 2', itemId: itemId });

    const { openModalDeclined } = useModalContextDeclined();
    const openModalDeclineds = (itemId) => openModalDeclined({ message: 'Modal Declined', itemId: itemId });

    const { openModal4 } = useModalContext4();
    const openModalQuatro = (itemId) => openModal4({ message: 'Modal 4', itemId: itemId });

    const [, dropRef] = useDrop({
        accept: 'CARD',
        drop(item, monitor,){
            

            const itemId = item.id;

            const targetListIndex = listIndex

            if(item.status == targetListIndex){
                return;
            }

            if(item.status == 0 || item.status == 1){
                if(targetListIndex > 2 && targetListIndex < 8){
                    alert("Lead deve passar por Informações Coletadas antes de prosseguir.")
                    return;
                }

                if(targetListIndex == 8){
                    if(userData.user.perfil == 0){
                        openModalDeclineds(itemId);
                    } else {
                        alert("Apenas vendedores podem declinar leads");
                        return;                        
                    }
                }
            }
            if(item.status != 0 || item.status > 1){
                if(targetListIndex == 0 || targetListIndex == 1){
                    alert("Lead não pode retornar para essa coluna.")
                    return;
                }
            }

            if(item.status == 2){
                if(targetListIndex != 3){
                    alert("Lead deve receber um orçamento antes de prosseguir")
                    return;
                }
            }

            if(targetListIndex == 1){
                if(userData.user.perfil == 0 || userData.user.perfil == 1){
                    openModalZero(itemId);
                } else {
                    alert("Apenas vendedores podem criar um agendamento.");
                    return;
                }
            }

            if(targetListIndex == 2){
                if(userData.user.perfil == 0 || userData.user.perfil == 1){
                   openModalUm(itemId);
                } else {
                    alert("Apenas vendedores podem coletar informações");
                    return;
                }
            }
            if(targetListIndex == 3){
                console.log(userData.user.perfil)
                if(userData.user.perfil == 0 || userData.user.perfil == 1){
                    openModalDois(itemId);
                } else {
                    alert("Apenas vendedores podem enviar orçamentos");
                    return;
                }
            }
            if(targetListIndex == 4){
                if(userData.user.perfil == 0 || userData.user.perfil == 1){
                    openModalQuatro(itemId);
                } else {
                    alert("Apenas vendedores podem aprovar orçamentos");
                    return;
                }
            }
            if(targetListIndex == 5){
                if(userData.user.perfil == 2){
                    // openModalCinco(itemId);
                } else {
                    alert("Apenas o administrativo pode usar essa coluna");
                    return;
                }
            }

            if(targetListIndex == 6){
                if(userData.user.perfil == 2){
                    // openModalSeis(itemId);
                } else {
                    alert("Apenas o administrativo pode usar essa coluna");
                    return;
                }
            }
            if(targetListIndex == 7){
                if(userData.user.perfil == 2){
                    // openModalSete(itemId);
                } else {
                    alert("Apenas o administrativo pode usar essa coluna");
                    return;
                }
            }
         }
        })

        const teste = () => {
            console.log(data)
        }
    
    return(
        <Container ref={dropRef} adm={adm} sendAdm={sendAdm} userData={userData} isAdmAction={isAdmAction} isRegularizarAction={isRegularizarAction} hasStatus={hasStatus} isScheduled={isScheduled} isWaitingCancel={isWaitingCancel}>
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
                            if(userData.user.perfil === 1){
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
                            } else {
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