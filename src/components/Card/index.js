
import { useDrag, useDrop } from 'react-dnd';
import React, { useRef, useContext, useState } from 'react';


import BoardContext from '../Board/context';

import { Container } from './styles';

import { useModalContext0 } from '../Modal/modal0.context';
import { useModalContext1 } from '../Modal/modal1.context';
import { useModalContext2 } from '../Modal/modal2.context';
import { useModalContext3 } from '../Modal/modal3.context';
import { useModalContext4 } from '../Modal/modal4.context';
import { useModalContextInfo } from '../Modal/modalInfo.context';
import { useModalContextDeclined } from '../Modal/modalDeclined.context';
import { useModalContextSendAdm } from '../Modal/modalSendAdm.context';
import { useModalContextReproveAdm } from '../Modal/modalReproveAdm.context';
import { useModalContextApproveAdm } from '../Modal/modalApproveAdm.context';
import { useModalContextRegularizarAction} from '../Modal/modalRegularizarAction.context';


import { useUserContext } from '../../contexts/userContext';


export default function Card({ data, index, listIndex, button, status, sendAdm, key, className, isAdmAction, isRegularizarAction }){

    const { userData, setUserData } = useUserContext();


    const ref = useRef();
    const{ move } = useContext(BoardContext);




        const { openModal0 } = useModalContext0();
        const openModalZero = (itemId) => openModal0({ itemId: itemId });

        const { openModal1 } = useModalContext1();
        const openModalUm = (itemId) =>  openModal1({ message: 'Modal 1', itemId: itemId });

        const { openModal2 } = useModalContext2();
        const openModalDois = (itemId) => openModal2({ message: 'Modal 2', itemId: itemId });

        const { openModal3 } = useModalContext3();
        const openModalTres = (itemId) => openModal3({ message: 'Modal 3', itemId: itemId });

        const { openModal4 } = useModalContext4();
        const openModalQuatro = (itemId) => openModal4({ message: 'Modal 4', itemId: itemId });

        const { openModalInfo } = useModalContextInfo();
        const openModalInfos = (itemId, status) => openModalInfo({ message: 'Modal Info', itemId: itemId, status: status  });

        const { openModalDeclined } = useModalContextDeclined();
        const openModalDeclineds = (itemId) => openModalDeclined({ message: 'Modal Declined', itemId: itemId });

        const { openModalSendAdm } = useModalContextSendAdm();
        const openModalSendAdms = (itemId) => openModalSendAdm({ message: 'Send Adm', itemId: itemId});

        const { openModalReproveAdm } = useModalContextReproveAdm();
        const openModalReproveAdms = (itemId) => openModalReproveAdm({ message: 'Reprove Adm', itemId: itemId});

        const { openModalApproveAdm } = useModalContextApproveAdm();
        const openModalApproveAdms = (itemId) => openModalApproveAdm({ message: 'Approve Adm', itemId: itemId});

        const { openModalRegularizarAction } = useModalContextRegularizarAction();
        const openModalRegularizarActions = (itemId, status) => openModalRegularizarAction({ message: 'Regularizar Pendencias', itemId: itemId, status: status});



        



    const [{ isDragging }, dragRef] = useDrag({
        type: 'CARD',
        item: { id: data.id, index, listIndex, end: data.end, status },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),

        
        

    })

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor) {
            const draggedListIndex = item.listIndex;
            const targetListIndex = listIndex;

            const draggedIndex = item.index;
            const targetIndex = index;
            
            if(draggedIndex === targetIndex && draggedListIndex === targetListIndex){
                return;
            }

            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;

            const draggedOffset = monitor.getClientOffset();
            const draggedTop = draggedOffset.y - targetSize.top;

            if (draggedIndex < targetIndex && draggedTop < targetCenter) {
                return;
             }
            if (draggedIndex > targetIndex && draggedTop > targetCenter){
                return;
            }

            move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);


            item.index = targetIndex;
            item.listIndex = targetListIndex;
        },
        drop(item, monitor,){


            const itemId = item.id;
            const fromListIndex = item.listIndex;

            const targetListIndex = listIndex

            const diffIndex = targetListIndex - fromListIndex

            if(item.status == targetListIndex){
                return;
            }

            if(item.status == 0 || item.status == 1){
                if(targetListIndex > 2 && targetListIndex < 8){
                    alert("Lead deve passar por Informações Coletadas antes de prosseguir.")
                    return;
                }

                if(targetListIndex == 8){
                    if(userData.perfil == 0){
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
                if(userData.perfil == 0){
                    openModalZero(itemId);
                } else {
                    alert("Apenas vendedores podem criar um agendamento.");
                    return;
                }
            }

            if(targetListIndex == 2){
                if(userData.perfil == 0){
                   openModalUm(itemId);
                } else {
                    alert("Apenas vendedores podem coletar informações");
                    return;
                }
            }
            if(targetListIndex == 3){
                console.log(userData.perfil)
                if(userData.perfil == 0){
                    openModalDois(itemId);
                } else {
                    alert("Apenas vendedores podem enviar orçamentos");
                    return;
                }
            }
            if(targetListIndex == 4){
                if(userData.perfil == 0){
                    openModalQuatro(itemId);
                } else {
                    alert("Apenas vendedores podem aprovar orçamentos");
                    return;
                }
            }
            if(targetListIndex == 5){
                if(userData.perfil == 2){
                    // openModalCinco(itemId);
                } else {
                    alert("Apenas o administrativo pode usar essa coluna");
                    return;
                }
            }

            if(targetListIndex == 6){
                if(userData.perfil == 2){
                    // openModalSeis(itemId);
                } else {
                    alert("Apenas o administrativo pode usar essa coluna");
                    return;
                }
            }
            if(targetListIndex == 7){
                if(userData.perfil == 2){
                    // openModalSete(itemId);
                } else {
                    alert("Apenas o administrativo pode usar essa coluna");
                    return;
                }
            }
         }
        })

    

    dragRef(dropRef(ref));

    return(
        
        <Container ref={ref} isDragging={isDragging} className={className}    >
            <header>

            </header>
            <p>
                {data.content}
                {/* {status} */}

            </p>
            {data.status &&
                    <div className="card-info">
                        <p className="card--status">{data.nome}</p>
                        <button type="button" className="btn-info" onClick={() => openModalInfos(data.id, data.status)}><img src="../../../info-icon.svg" alt="Informações" /></button>
                    </div>
                    
            }

            {sendAdm &&
                <button type="button" className="btn-sendAdm" onClick={() => openModalSendAdms(data.id)}>Enviar para ADM</button>
            }

            {isAdmAction &&
                <>
                <div className="buttonsAdm">
                    <button
                        type="button"
                        onClick={() => openModalApproveAdms(data.id)}
                    >Aprovar</button>
                    <button
                        type="button"
                        onClick={() => openModalReproveAdms(data.id)}
                    >Recusar</button>
                </div>
                </>
            }

            {isRegularizarAction &&
                <>
                <div className="buttonsAdm">
                    <button
                        type="button"
                        onClick={() => openModalRegularizarActions(data.id, data.status)}
                    >Regularizar</button>
                </div>

                </>
            }

            
            

            { data.user && <img src={data.user} alt="Avatar" /> }
        </Container>
    );
}