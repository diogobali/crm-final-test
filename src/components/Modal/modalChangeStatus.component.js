import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextChangeStatus } from './modalChangeStatus.context'




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
                                <option value="Ag. Emissão de Contrato">Aguardando Emissão de Contrato</option>
                                <option value="Ag. Contrato Assinado">Aguardando Contrato Assinado</option>
                                <option value="Ag. Pagamento 1 Parcela">Aguardando Pagamento da 1ª Parcela</option>
                            </select>
                        </div>
                        {newStatus === "Ag. Contrato Assinado" &&
                            <div>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    id="selectfile"
                                    // onChange={handleSetAttachment}
                                    name="attachment"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        }
                        {newStatus === "Ag. Contrato Assinado" &&
                            <div>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    id="selectfile"
                                    // onChange={handleSetAttachment}
                                    name="attachment"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        }
                        

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