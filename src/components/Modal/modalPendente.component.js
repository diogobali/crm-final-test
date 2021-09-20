import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextPendente } from './modalPendente.context'
import { MdAddAlarm } from 'react-icons/md';
import reasonsToReprove from '../../jsons/reasonsToReprove.json';
import documents from '../../jsons/documents.json';

const ModalPendente = () => {
    const {
        modalPendenteState: { visible, itemId }, 
    } = useModalContextPendente();

    function refreshPage(){
        window.location.reload();
    } 

    

    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="contaigner">
                    <button type="button">Teste</button>
                    <div className="title">
                        <h1>Pendencia</h1>
                    </div>
                    <div className="content">
                        <form>
                            
                            </form>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default ModalPendente;