import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextRegularizarAction } from './modalRegularizarAction.context'
import { MdAddAlarm } from 'react-icons/md';
import reasonsToReprove from '../../jsons/reasonsToReprove.json';
import documents from '../../jsons/documents.json';

const ModalRegularizarAction = () => {
    const {
        modalRegularizarActionState: { visible, itemId, status }, 
    } = useModalContextRegularizarAction();

    function refreshPage(){
        window.location.reload();
    } 
    
    const [infos, setInfos] = useState([]);


    const optionsForm = {
        method: 'POST',
        body: JSON.stringify({
            leadId: itemId,
            status: status
        })
    };
    async function fetchApi () {
        console.log(status);
        if(!infos.id) {
            const response = await fetch("https://moplanseguros.com.br/getleadinfo.php", optionsForm)
            const json = await response.json();
            setInfos(json);
            console.log(infos);
        }
    }

    const tesste = () => {
        console.log(infos);
    }
    
    
    if(!infos.id) fetchApi();
    if(!visible) return null;


    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <button type="button" onClick={tesste}>Teste</button>
                    <div className="title">
                        <h1>Regularizar Pendencia</h1>
                    </div>
                    <div className="content">
                        <form>
                            <div>
                                <span>
                                    MOTIVO:
                                </span>
                                {infos.pendencias && infos.pendencias[0].reason_id == 1 && 
                                    <div>
                                        <span>Documentos faltando</span>
                                    </div>                                    
                                }
                            </div>
                                <div>
                                    <div>
                                        <span><strong>DOCUMENTO</strong></span>
                                    </div>
                                    <div>
                                        <span><strong>PESSOA</strong></span>
                                    </div>
                                    <div>
                                        <span><strong>AÇÃO</strong></span>
                                    </div>
                                </div>
                                {
                                    infos.pen_docs[0].map(item => {
                                        return(
                                        <div>
                                            <div>
                                                <span>
                                                    {item[4]}
                                                </span>
                                            </div>
                                            <div>
                                                <span>
                                                    {item[3]}
                                                </span>
                                            </div>
                                            <div>
                                                <input 
                                                    type="file"
                                                ></input>
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            


                        </form>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default ModalRegularizarAction;