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
    const [docsPendentes, setDocsPendentes] = useState([])
    const [pessoasPendentes, setPessoasPendentes] = useState([])



    const optionsForm = {
        method: 'POST',
        body: JSON.stringify({
            leadId: itemId,
            status: status
        })
    };
    async function fetchApi () {
        if(!infos.id) {
            const response = await fetch("https://moplanseguros.com.br/getleadinfo.php", optionsForm)
            const json = await response.json();
            setInfos(json);
            setDocsPendentes(json.pen_docs[0].map(pen_doc => pen_doc))

            console.log(infos);
        }
    }

    const [responseApi, setResponseApi] = useState()
    const [file, setFile] = useState()
    const [image, setImage] = useState();

    const upload_image = () => {
        const form_data = new FormData();
        form_data.append('attachment', image);
        form_data.append('leadId', itemId);
        form_data.append('type', file);
        form_data.append('fileName', "NOVO " + file);
        form_data.append('fileOwner', fileOwner);

        fetch('https://moplanseguros.com.br/attachdocuments.php', {
            method: "POST",
            body: form_data
        }).then(function(response){
            return response;
        }).then(response => response.json())
        .then(response => {
            setResponseApi(response);
            load_image();
        });
    }

    const [people, setPeople] = useState([]);
    const [fileOwner, setFileOwner] = useState()



    async function load_people() {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                leadId: itemId,
            })
        };
        const response = await fetch("https://moplanseguros.com.br/getpeople.php", optionsForm)
        const json = await response.json();
        setPeople(json);
    }

    const load_image = () => {
        const form_data = new FormData();
        form_data.append('leadId', itemId);

        fetch('https://moplanseguros.com.br/attachdocuments.php', {
            method: "POST",
            body: form_data
        }).then(function(response){
            return response;
        }).then(response => response.json())
        .then(response => {
            setResponseApi(response);
        });
    }
    useEffect(() => {
        load_image() 
        load_people()
    }, [itemId]);

    const tessste = () => {
        console.log(docsPendentes)

    }

    

    const sendAdm = () => {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({  
                leadId: itemId,
            })
        };
        fetch('https://moplanseguros.com.br/fixissue_pendocs.php', optionsForm)
        .then(function(response) {
        window.location.reload();
        })
    }



    if(!infos.id) fetchApi();
    
    if(!visible) return null;
    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <button type="button" onClick={tessste}>Teste</button>
                    <div className="title">
                        <h1>Regularizar Pendencia</h1>
                    </div>
                    <div className="content">
                        <form onSubmit={sendAdm}>
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
                            <div className="title">
                                <span>Documentos Pendentes</span>
                            </div>
                            <div>
                                <ul id="listDir">
                                {infos?.pen_docs?.map(item => {
                                    return(
                                        item.map(item => {
                                            return(
                                                <li>{item[1]}</li>
                                            )
                                        })
                                        )
                                    
                                    
                                })
                            }
                            </ul>
                            </div>
                            <div>
                                <div>
                                    <select
                                        onChange={(e) => setFile(e.target.value)}
                                    >
                                        <option value="">Selecione...</option>
                                        {docsPendentes.map(function (docPendente){
                                            return(
                                                <option key={docPendente} value={docPendente[1]}>
                                                    {docPendente[1]}
                                                </option>
                                            )
                                        })
                                            
                                        }
                                    </select>
                                    <select
                                        onChange={(e) => setFileOwner(e.target.value)}
                                    >
                                <option value="">Selecione o dono do documento</option>
                                <option value="empresa">Empresa</option>
                                {
                                    people.titulares && 
                                    people.titulares.map(item => {
                                        return(
                                            item.map(item => {
                                                return(
                                                    <option value={item[0]}>{item[0]} (Titular)</option>
                                                )
                                            })
                                        )
                                    })
                                }
                                {
                                    people.dependentes &&
                                    people.dependentes.map(item => {
                                        return(
                                            item.map(item => {
                                                return(
                                                    <option value={item[0]}>{item[0]} ({item[1]} de {item[3]})</option>
                                                )
                                            })
                                        )
                                    })
                                }
                                

                            </select>
                                </div>
                                <div>
                                    <input 
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        id="selectfile"
                                        name="attachment"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    ></input>
                                </div>
                                <div>
                                <button
                                    type="button"
                                    onClick={upload_image}
                                    className="btn-upload"                            
                                ><img src="../../../btn-send-black.svg"></img></button>
                                </div>
                            </div>
                            <div className="documentsList">
                            <div>
                                <h3>Documentos Empresa</h3>
                                <ul id="listDir">
                                    {responseApi?.empresa &&
                                        responseApi.empresa.map((item, index) => index > 1 &&   <li> <a href={`https://moplanseguros.com.br/uploads/${itemId}/empresa/${item[1]}`} download target="_blank">{item[1]}</a></li>)
                                    }
                                </ul>
                            </div>
                            <div>
                                <h3>Documentos Titulares e Dependentes</h3>
                                <ul id="listDir">
                                    {responseApi?.geral &&
                                        responseApi.geral.map((item, index) => index > 1 &&   <li> <a href={`https://moplanseguros.com.br/uploads/${itemId}/${item[1]}`} download target="_blank"> {item[1]} </a></li>)
                                    }
                                </ul>
                            </div>
                        </div>  
                            <div className="content-buttons">
                                <button type="button" className="btn-cancelar" onClick={refreshPage}><img src="../../../btn-cancel.svg"></img> </button>
                                <div className="confirm-documents-up">
                                    <button type="submit" className="btn-confirmar"><img src="../../../btn-confirm.svg"></img> </button>
                                    <div className="confirm-documents">
                                        <input
                                            type="checkbox"
                                            required
                                            name="is-documents-ok"
                                            id="is-documents-ok"
                                        ></input>
                                        <label 
                                            for="is-documents-ok"
                                        >Confirmo que os documentos necessários foram anexados.</label>
                                    </div>
                                </div>
                                {/* <button type="button" className="btn-confirmar" onClick={sendForm}><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default ModalRegularizarAction;