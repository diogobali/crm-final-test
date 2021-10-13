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
    const [docNonExistent, setDocNonexistent] = useState()
    const [docOwnerId, setDocOwnerId] = useState()
    const [docOwner, setDocOwner] = useState()
    const [docsNonexistent, setDocsNonexistent] = useState([])
    const [docParentesNonExistent, setDocParentesNonexistent] = useState()
    const [docParentesOwnerId, setDocParentesOwnerId] = useState()
    const [docParentesOwner, setDocParentesOwner] = useState()
    const [docParentesFileName, setDocParentesFileName] = useState();
    const [docFileName, setDocFileName] = useState();
    const [docsParentesNonexistent, setDocsParentesNonexistent] = useState([])
    const [docUnreadable, setDocUnreadable] = useState()
    const [docsUnreadable, setDocsUnreadable] = useState([])

    const [titulares, setTitulares] = useState()
    const [parentes, setParentes] = useState()

    const [responseApi, setResponseApi] = useState([])
    
    const load_image = () => {
        const form_data = new FormData();
        form_data.append('leadId', itemId);
        fetch('https://moplanseguros.com.br/attachdocuments.php', {
            method: "POST",
            body: form_data
        }).then(function(response){
            console.log(response);
            return response;
        }).then(response => response.json())
        .then(response => {
            setResponseApi(response);
        });
    }
    useEffect(() => {
        load_image() 
    }, [itemId]);

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

    const newDocUnreadable = (r) => {

        if(r.target.checked){
            setDocUnreadable(r.target.value);
            newDocUnreadableCallback();
        } else {
            removeDocsUnreadable(r.target.value)
        }
        
        

    }
    const newDocUnreadableCallback = useCallback(() => {
        if(docUnreadable){
        setDocsUnreadable((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                document: docUnreadable
            }
        ]);
    }
    }, [docUnreadable, docsUnreadable]);


    
    const removeDocsUnreadable = useCallback(
        (id) => {
            setDocsUnreadable(docsUnreadable.filter((c) => c.document !== id));
        },
        [docsUnreadable]
    );
    
    const tesste = () => {
        console.log(docsUnreadable)
    }


   const newDocNonexistent = useCallback(() => {
        setDocsNonexistent((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                ownerId: docOwnerId,
                owner: docOwner,
                doc: docNonExistent,
                file_name: docFileName,
            }
        ]);
        console.log(docsNonexistent)
    }, [docsNonexistent, docNonExistent, docOwner]);

    const removeDocsNonexistent = useCallback(
        (id) => {
            setDocsNonexistent(docsNonexistent.filter((c) => c.id !== id));
        },
        [docsNonexistent]
    );

    const newDocParentesNonexistent = useCallback(() => {
        setDocsParentesNonexistent((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                ownerId: docParentesOwnerId,
                owner: docParentesOwner,
                doc: docParentesNonExistent,
                file_name: docParentesFileName,
            }
        ]);
    }, [docsParentesNonexistent, docParentesNonExistent, docParentesOwner]);

    const removeDocsParentesNonexistent = useCallback(
        (id) => {
            setDocsParentesNonexistent(docsParentesNonexistent.filter((c) => c.id !== id));
        },
        [docsParentesNonexistent]
    );

    const docOwnerAux = (r) => {
        console.log(r);
        setDocOwnerId(r);
        titulares.map(item => {
            const label = item.find(item => item[1] == r);
            setDocOwner(label[0])
        })
    }
    const docParentesOwnerAux = (r) => {
        setDocParentesOwnerId(r);
        parentes.map(item => {
            const label = item.find(item => item[1] == r);
            setDocParentesOwner(label[0])
        })
    }

    const [docsGeralPendentes, setDocsGeralPendentes] = useState([]);
    const [docsEmpresaPendentes, setDocsEmpresaPendentes] = useState([]);

    const auxDocsGeralPendentes = (e) => {
        if(e.target.checked){
            setDocsGeralPendentes((prevState) => [
                ...prevState,
                e.target.value
            ])
        } else {
            setDocsGeralPendentes(docsGeralPendentes.filter((c) => c != e.target.value))
        }
    }

    const auxDocsEmpresaPendentes = (e) => {
        if(e.target.checked){
            setDocsEmpresaPendentes((prevState) => [
                ...prevState,
                e.target.value
            ])
        } else {
            setDocsEmpresaPendentes(docsEmpresaPendentes.filter((c) => c != e.target.value))
        }
    }

    const sendPendencia = (e) => {
        e.preventDefault();
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({  
                leadId: itemId,
                reason: divWhichDoc,
                docsParentesNonExistent: docsParentesNonexistent,
                docsTitularesNonExistent: docsNonexistent,
                docsUnreadable: docsUnreadable,
                docsGeralPendentes: docsGeralPendentes,
                docsEmpresaPendentes: docsEmpresaPendentes,
            })
        };
        fetch('https://moplanseguros.com.br/sendpendencia.php', optionsForm)
        .then(function(response) {
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
                        <h1>Lançar Pendencia</h1>
                    </div>
                    <div className="content">
                        <form>
                            <div>
                                <span>
                                    Motivo:
                                </span>
                                <select
                                    onChange={(e) => setDivWhichDoc(e.target.value)}
                                >
                                    <option value="">Selecione...</option>
                                    {
                                        reasonsToReprove.map(item => {
                                            return(
                                                <option value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {divWhichDoc === "1" &&
                                <div className="divWhichDocUnreadable">
                                    <div>
                                        <h3>Documentos Empresa</h3>
                                        <ul id="listDir">
                                            {responseApi.empresa &&
                                                responseApi.empresa.map((item, index) => index > 1 &&   
                                                <li>
                                                    <input 
                                                        type="checkbox"
                                                        name="documentosPendentes"
                                                        id={item[1]}
                                                        value={item[1]}
                                                        onChange={(e) => auxDocsEmpresaPendentes(e)}
                                                    />
                                                    <label
                                                        for={item[1]}
                                                    >
                                                    {item[1]}
                                                    </label>
                                                </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div>
                                        <h3>Documentos Titulares e Dependentes</h3>
                                        <ul id="listDir">
                                            {responseApi.geral &&
                                                responseApi.geral.map((item, index) => index > 1 &&   
                                                <li>
                                                    <input
                                                        type="checkbox"
                                                        name="documentosPendentes"
                                                        id={item[1]}
                                                        value={item[1]}
                                                        onChange={(e) => auxDocsGeralPendentes(e)}
                                                    />
                                                    <label
                                                        for={item[1]}
                                                    >
                                                    {item[1]}
                                                    </label>
                                                </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>  
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