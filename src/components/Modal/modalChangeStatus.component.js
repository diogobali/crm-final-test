import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextChangeStatus } from './modalChangeStatus.context'
import proposal_status from '../../jsons/proposal_status.json';




const ModalChangeStatus = () => {
    const {
        modalChangeStatusState: { visible, itemId }, 
    } = useModalContextChangeStatus();

    function refreshPage(){
        window.location.reload();
    } 

    const [newStatus, setNewStatus] = useState();
    const [file, setFile] = useState();

    const changeStatus = () => {
        const form_data = new FormData();
        form_data.append('attachment', file);
        form_data.append('leadId', itemId );
        form_data.append('status', newStatus);
        fetch('https://moplanseguros.com.br/changestatus.php',  {
            method: "POST",
            body: form_data
        })
        .then(function(response) {
            console.log(response);
            window.location.reload();
        })
    }
    
    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Alterar Status</h1>
                    </div>
                    <div className="content">
                        <div>
                            <span>Alterar para</span>
                            <select
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <option value="">Selecione uma opção...</option>
                            {
                                proposal_status.sort((a,b) => a.label > b.label ? 1 : -1).map(status => {
                                    return(
                                        <option value={status.name}>{status.label}</option>
                                    )
                                })
                            }
                            </select>
                        </div>
                        

                        <div className="content-buttons">
                            <button type="button" className="btn-cancelar" onClick={refreshPage}><img src="../../../btn-cancel.svg"></img> </button>
                            <button type="submit" className="btn-confirmar" onClick={changeStatus}><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default ModalChangeStatus;