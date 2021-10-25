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

    const [responseApi, setResponseApi] = useState([])
    const [fileName, setFileName] = useState()
    const [fileOwner, setFileOwner] = useState()

    const [image, setImage] = useState();

    const upload_image = () => {
        const form_data = new FormData();
        form_data.append('attachment', image);
        form_data.append('leadId', itemId);
        form_data.append('fileName', fileName);
        form_data.append('fileOwner', fileOwner);

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

    const [people, setPeople] = useState([]);
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

    const [data, setData] = useState([]);
    const [counterCalls, setCounterCalls] = useState(0);


    async function fetchApi () {
        const optionsFormGet = {
            method: 'POST',
            body: JSON.stringify({
                leadId: itemId,
                final: '1',
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
            console.log(response);
        })
    }

    const teste = () => {
        console.log(data);
    }

    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Finalizar</h1>
                        <button type="button" onClick={teste}>Teste</button>
                    </div>
                    <div className="content">
                        {data.orcamentos &&
                        data.orcamentos.map(data => {
                            return(
                                data.map(data => {
                                    return(
                                        <>
                                        <div>
                                            <span>Operadora:</span>
                                            <span>{data[0]}</span>
                                        </div>
                                        <div>
                                            <span>Plano:</span>
                                            <span>{data[1]}</span>
                                        </div>
                                        <div>
                                            <span>Valor Fechado:</span>
                                            <span>{data.[4]}</span>
                                        </div>
                                        </>
                                    )
                                })
                           
                            )
                        })}
                            
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
                                <option value="CARTEIRINHA">CARTEIRINHA</option>
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
                            <div>
                                <h3>Documentos Empresa</h3>
                                <ul id="listDir">
                                    {responseApi.empresa &&
                                        responseApi.empresa.map((item, index) => index > 1 &&   <li> <a href={`https://moplanseguros.com.br/uploads/${itemId}/empresa/${item[1]}`} download target="_blank">{item[1]}</a></li>)
                                    }
                                </ul>
                            </div>
                            <div>
                                <h3>Documentos Titulares e Dependentes</h3>
                                <ul id="listDir">
                                    {responseApi.geral &&
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

export default ModalSendAdm;