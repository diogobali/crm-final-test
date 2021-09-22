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
            setDocsPendentes(json.pen_docs[0].map(pen_doc => pen_doc[4]))

            console.log(infos);
        }
    }

    const [responseApi, setResponseApi] = useState()
    const [fileName, setFileName] = useState()
    const [fileType, setFileType] = useState()
    const [image, setImage] = useState();

    const upload_image = () => {
        const form_data = new FormData();
        form_data.append('attachment', image);
        form_data.append('leadId', itemId);
        form_data.append('type', fileType);
        form_data.append('fileName', fileName);

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

    useEffect(
        function(){
            if (!infos.pen_docs) return;

            const dados = infos.pen_docs[0].map(pen_doc => pen_doc[3]);
            const dadosFormatados = dados.filter(
                (dado, index, array) => array.indexOf(dado) === index
            );

            const docs = infos.pen_docs[0].map(pen_doc => pen_doc[4]);
            const docsFormatados = docs.filter(
                (dado, index, array) => array.indexOf(dado) === index
            );

            setPessoasPendentes(dadosFormatados)
            setDocsPendentes(docsFormatados)
        },
        [infos]
    );

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
                                {infos?.pen_docs?.map(item => {
                                    return(
                                        item.map(item => {
                                            console.log(item)
                                            return(
                                                <span>{item[4]} de {item[3]}</span>
                                            )
                                        })
                                    )
                                    
                                })
                            }
                            </div>
                            <div>
                                <div>
                                    <select
                                    >
                                        <option value="">Selecione...</option>
                                        {docsPendentes.map(function (docPendente){
                                            return(
                                                <option key={docPendente} value={docPendente}>
                                                    {docPendente}
                                                </option>
                                            )
                                        })
                                            
                                        }
                                    </select>
                                </div>
                                <div>
                                    <select 
                                        onChange={(e) => setFileName(e.target.value)}
                                        value={fileName}
                                        id="selectFileName"
                                    >
                                        <option value="">Selecione...</option>
                                        {pessoasPendentes.map(function (pessoaPendente){
                                            return(
                                                <option key={pessoaPendente} value={pessoaPendente}>
                                                    {pessoaPendente}
                                                </option>
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
                                <span>Documentos anexados</span>
                                <ul id="listDir">
                                    {responseApi &&
                                        responseApi.map((item, index) => index > 1 &&   <li> <a href={item[0]+item[1]} download="Documentacao.pdf" target="_blank"> {item[1]} </a></li>)
                                    }
                                </ul>
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