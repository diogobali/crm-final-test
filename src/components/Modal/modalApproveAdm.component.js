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
    }

    const [plataforma, setPlataforma] = useState();
    const [proposta, setProposta] = useState();
    const [valor, setValor] = useState();

    const sendForm = (e) => {
        e.preventDefault();
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({  
                leadId: itemId,
                plataforma: plataforma,
                proposta: proposta,
                valor: valor,
            })
        };
        fetch('https://moplanseguros.com.br/approveadm.php', optionsForm)
        .then(function(response) {
            window.location.reload();
        })

    }

    if(counterCalls === 0) fetchApi();

    const teste = () => {
        console.log(data)
    }

    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Aprovar Venda</h1>
                        <button type="button" onClick={teste}>Teste</button>
                    </div>
                    <div className="content">
                        <form>

                            <div className="title">
                                Informacoes do Plano
                            </div>
                            {data.orcamentos &&
                            <>
                                <div>                                
                                    <span>Operadora: </span>
                                    <span>{data.orcamentos.map(item => {
                                        return(
                                            item.map(item => {
                                                return(
                                                    item[0]
                                                )
                                            })
                                        )
                                    })}</span>
                                </div>
                                <div>    
                                    <span>Plano:</span>
                                    <span>{data.orcamentos.map(item => {
                                        return(
                                            item.map(item => {
                                                return(
                                                    item[1]
                                                )
                                            })
                                        )
                                    })}</span>
                                </div>
                                <div>    
                                    <span>Acomodação: </span>
                                    <span>{data.orcamentos.map(item => {
                                        return(
                                            item.map(item => {
                                                return(
                                                    item[2]
                                                )
                                            })
                                        )
                                    })}</span>
                                </div>
                                <div> 
                                    <span>Coparticipacao: </span>
                                    <span>{data.orcamentos.map(item => {
                                        return(
                                            item.map(item => {
                                                return(
                                                    item[3]
                                                )
                                            })
                                        )
                                    })}</span>
                                </div>
                                <div> 
                                    <span>Valor Real: </span>
                                    <input
                                        type="number"
                                        onChange={(e) => setValor(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <span>Plataforma:</span>
                                    <select
                                        onChange={(e) => setPlataforma(e.target.value)}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="viva">Viva</option>
                                    </select>

                                </div>
                                <div>
                                    <span>Nº da Proposta</span>
                                    <input 
                                        type="text"
                                        onChange={(e) => setProposta(e.target.value)}
                                    />
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