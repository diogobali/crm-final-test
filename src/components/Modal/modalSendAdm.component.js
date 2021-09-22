import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextSendAdm } from './modalSendAdm.context'
import { MdAddAlarm } from 'react-icons/md';

const ModalSendAdm = () => {
    const {
        modalSendAdmState: { visible, itemId }, 
    } = useModalContextSendAdm();

    function refreshPage(){
        window.location.reload();
    } 

    const [responseApi, setResponseApi] = useState()
    const [fileName, setFileName] = useState()

    const [image, setImage] = useState();

    const upload_image = () => {
        const form_data = new FormData();
        form_data.append('attachment', image);
        form_data.append('leadId', itemId);
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
    }, [itemId]);

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

    if(counterCalls === 0) fetchApi();

    const sendAdm = () => {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({  
                leadId: itemId,
            })
        };
        fetch('https://moplanseguros.com.br/sendadm.php', optionsForm)
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
                        <h1>Finalizar</h1>
                    </div>
                    <div className="content">
                            <div>
                                <span>Operadora:</span>
                                <span>{data.operadora}</span>
                            </div>
                            <div>
                                <span>Plano:</span>
                                <span>{data.plano}</span>
                            </div>
                            <div>
                                <span>Valor Fechado:</span>
                                <span>{data.valorFechado}</span>
                            </div>
                            <div>
                                <span>Documentos necessários:</span>
                            </div>
                        <form onSubmit={sendAdm}>
                        <div id="msg" className="msg">

                        </div>
                        
                        <div>
                            {itemId &&
                                <input 
                                    name="lead_id"
                                    type="text"
                                    value={itemId} 
                                    style={{display:'none'}}
                                />
                            }
                            <select
                                onChange={(e) => setFileName(e.target.value)}
                                value={fileName}
                                id="selectFileName"
                            >
                                <option value="">Selecione o nome do arquivo</option>
                                <option value="RG">RG</option>
                                <option value="CNH">CNH</option>
                                <option value="Comprov">COMPROVANTE DE RESIDENCIA</option>
                            </select>
                            <input 
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                id="selectfile"
                                // onChange={handleSetAttachment}
                                name="attachment"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <button
                                type="button"
                                onClick={upload_image}
                                className="btn-upload"                            
                            ><img src="../../../btn-send-black.svg"></img></button>
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

export default ModalSendAdm;