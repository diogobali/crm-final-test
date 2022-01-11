import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextReproveAdm } from './modalReproveAdm.context'
import { MdAddAlarm } from 'react-icons/md';
import reasonsToReprove from '../../jsons/reasonsToReprove.json';
import documents from '../../jsons/documents.json';

const ModalReproveAdm = () => {
    const {
        modalReproveAdmState: { visible, itemId }, 
    } = useModalContextReproveAdm();

    function refreshPage(){
        window.location.reload();
    } 

    const [divWhichDoc, setDivWhichDoc] = useState()
   

    const [titulares, setTitulares] = useState()
    const [parentes, setParentes] = useState()


    const load_titulares = () => {
        const form_data = new FormData();
        form_data.append('leadId', itemId);
        fetch('https://moplanseguros.com.br/gettitulares.php', {
            method: "POST",
            body: form_data
        }).then(function(response){
            console.log(response)
            return response
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setTitulares(response);
        });
    }
    useEffect(() => {
        load_titulares() 
    }, [itemId]);

    const load_parentes = () => {
        const form_data = new FormData();
        form_data.append('leadId', itemId);
        fetch('https://moplanseguros.com.br/getparentes.php', {
            method: "POST",
            body: form_data
        }).then(function(response){
            console.log(response)
            return response
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setParentes(response);
        });
    }
    useEffect(() => {
        load_parentes() 
    }, [itemId]);

    const sendPendencia = (e) => {
        e.preventDefault();
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({  
                leadId: itemId,
                reason_id: divWhichDoc,

            })
        };
        fetch('https://moplanseguros.com.br/sendpendencia.php', optionsForm)
        .then(function(response) {
            window.location.reload();
        })

    }

    const [ selectedReason, setSelectedReason ] = useState();
    const [ selectedDocument, setSelectedDocument ] = useState();
    const [ selectedPeople, setSelectedPeople ] = useState();

    const [ pendencies, setPendencies ] = useState([])

    const handleSelectedReason = (e) => {
        setSelectedReason(e.value)
    }

    const handleSelectedDocument = (e) => {
        setSelectedDocument(e.value)
    }

    const handleSelectedPeople = (e) => {
        setSelectedPeople(e.value)
    }

    const AddNewPendency = useCallback(() => {
        setPendencies((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                document: selectedDocument,
                people: selectedPeople
            }     
        ]);
    }, [pendencies]);

   const removePendency = useCallback(
       (id) => {
           setPendencies(pendencies.filter((c) => c.id !== id))
       },
       [pendencies]
   )


    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Lançar Pendencia</h1>
                    </div>
                    <div className="content">
                        <form>
                            <div>
                                <span>Motivo</span>
                                <select 
                                    onChange={(e) => handleSelectedReason(e.target)}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="1">Documento faltando/ilegivel</option>
                                    <option value="2">Informação incorreta</option>
                                    <option value="3">Outros</option>
                                </select>
                            </div>

                            {selectedReason === "1" &&
                            <>
                                <div className="reasonToReprove_1">
                                    <div>
                                        <span>
                                            Documento:
                                        </span>
                                        <select
                                            onChange={(e) => handleSelectedDocument(e.target)}
                                        >
                                            <option value="">Selecione</option>
                                            <option value="CNH">CNH</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span>
                                            De quem:
                                        </span>
                                        <select
                                            onChange={(e) => handleSelectedPeople(e.target)}
                                        >
                                            <option value="">Selecione</option>
                                            <option value="Maria">Maria</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span>
                                            Inserir
                                        </span>
                                        <button
                                            type="button"
                                            onClick={
                                                AddNewPendency
                                            }
                                        >
                                        Add
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <ul>
                                        {pendencies.map(item => {
                                            return(
                                                <li>
                                                    <span>{item.document} de {item.people}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removePendency(item.id)}
                                                    >X</button>
                                                </li>
                                            )
                                        })}
                                        <li>RG do Joao</li>
                                        <li>RG do Joao</li>
                                        <li>RG do Joao</li>
                                    </ul>
                                </div>
                            </>
                            }
                                
                            <div className="content-buttons">
                                <button type="button" className="btn-cancelar" onClick={refreshPage} title="Voltar"><img src="../../../btn-cancel.svg"></img> </button>
                                <button type="submit" className="btn-confirmar" onClick={(e) => sendPendencia(e)} title="Aprovar orçamento"><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default ModalReproveAdm;