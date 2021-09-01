
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


export default function Card({ data, index, listIndex, button, status, sendAdm, key, className }){

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
                    openModalDeclineds(itemId);
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
               openModalZero(itemId);
               console.log(item.status)
            }

            if(targetListIndex == 2){
                console.log("From: " + fromListIndex);
               openModalUm(itemId);
            }

            if(targetListIndex == 3){
                openModalDois(itemId);
            }

            if(targetListIndex == 4){
                openModalQuatro(itemId);
            }

            if(targetListIndex > 4 && targetListIndex < 8){
                alert("Coluna disponível apenas para o administrativo.")
                return;
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
                <button type="button" className="btn-sendAdm" onClick={() => openModalSendAdms(data.id)}>Enviar</button>
            }

            
            

            { data.user && <img src={data.user} alt="Avatar" /> }
        </Container>
    );
}