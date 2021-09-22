import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextApproveAdm } from './modalApproveAdm.context'

const ModalApproveAdm = () => {
    const {
        modalApproveAdmState: { visible, itemId }, 
    } = useModalContextApproveAdm();

    function refreshPage(){
        window.location.reload();
    } 

    const [data, setData] = useState([]);
    const [counterCalls, setCounterCalls] = useState(0);


    async function fetchApi () {
        const optionsFormGet = {
            method: 'POST',
            body: JSON.stringify({
                leadId: itemId,
            })
        };
        if(counterCalls === 0) {
            const response = await fetch("https://moplanseguros.com.br/getorcamentos.php", optionsFormGet)
            const json = await response.json();   
            setData(json);
            setCounterCalls(counterCalls + 1);
        }
        console.log(data.leadId)   
    }

    const sendForm = (e) => {
        e.preventDefault();
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({  
                leadId: itemId,
            })
        };
        fetch('https://moplanseguros.com.br/approveadm.php', optionsForm)
        .then(function(response) {
            window.location.reload();
        })

    }

    if(counterCalls === 0) fetchApi();

    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Aprovar Venda</h1>
                    </div>
                    <div className="content">
                        <form>

                            <div className="title">
                                Informacoes do Plano
                            </div>
                            {data.id &&
                            <>
                                <div>
                                    <span>ID: </span>
                                    <span>{data.id}</span>
                                </div>
                                <div>
                                    <span>Status: </span>
                                    <span>{data.status}</span>
                                </div>
                                <div>                                
                                    <span>Operadora: </span>
                                    <span>{data.operadora}</span>
                                </div>
                                <div>    
                                    <span>Plano:</span>
                                    <span>{data.plano}</span>
                                </div>
                                <div>    
                                    <span>Cobertura: </span>
                                    <span>{data.cobertura}</span>
                                </div>
                                <div> 
                                    <span>Coparticipacao: </span>
                                    <span>{data.coparticipacao}</span>
                                </div>
                                <div> 
                                    <span>Valor Fechado: </span>
                                    <span>{data.valorFechado}</span>
                                </div>

                                </>
                            }
                            
                            <div className="content-buttons">
                                <button type="button" className="btn-cancelar" onClick={refreshPage} title="Voltar"><img src="../../../btn-cancel.svg"></img> </button>
                                <div className="confirm-documents-up">
                                    <button type="submit" className="btn-confirmar" onClick={(e) => sendForm(e)}><img src="../../../btn-confirm.svg"></img> </button>
                                    <div className="confirm-documents">
                                        <input
                                            type="checkbox"
                                            required
                                            name="is-documents-ok"
                                            id="is-documents-ok"
                                        ></input>
                                        <label 
                                            for="is-documents-ok"
                                        >Confirmo que os dados estão corretos.</label>
                                    </div>
                                </div>
                            </div>
                            
                            </form>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default ModalApproveAdm;