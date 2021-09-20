import React, { useState, useEffect, useCallback } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextInfo } from './modalInfo.context'
import './styles.scss';




const ModalInfo = () => {
    const { 
        modalInfoState: { message, visible, itemId, status }, 
        closeModalInfo,
    } = useModalContextInfo();

    function refreshPage(){
        window.location.reload();
    } 

    const [infos, setInfos] = useState([]);
    const [counterCalls, setCounterCalls] = useState(0);
    const optionsForm = {
        method: 'POST',
        body: JSON.stringify({
            leadId: itemId,
            status: status
        })
    };

    async function fetchApi () {
        if(!infos.id && counterCalls === 0) {
            const response = await fetch("https://moplanseguros.com.br/getleadinfo.php", optionsForm)
            const json = await response.json();
            setInfos(json);
            setCounterCalls(counterCalls + 1);
        }
    }

    const [responseApi, setResponseApi] = useState();

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


    if(!infos.id && counterCalls === 0) fetchApi();
    if(!visible) return null;

    
    const teste = () => {
        console.log(infos);
    }    

    return( 
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Geral</h1>
                    </div>

                    <div className="content">
                        <form>
                        <div className="infos-final">
                            <button type="button" onClick={teste}>Teste</button>
                            <div>
                                <span>Nome:</span>
                                {infos && infos.nome }
                            </div>
                            {infos.type &&
                            <>
                            <div>
                                <span>Tipo de Lead:</span>
                                {infos.type}
                            </div>
                            </>
                            }
                            {infos.titularId &&
                            <>
                            <div>
                                <ul id="listPeoples">
                                {infos.parentescos &&
                                    infos.parentescos.map(parentesco => {
                                        return(
                                            parentesco.map(item => {
                                                console.log(item)
                                                return(
                                                    <li>
                                                        <span>{item[1]}</span>
                                                        <span>{item[0]}</span>
                                                    </li>
                                                )
                                        })
                                    )     
                                })
                                }
                            </ul>
                            </div>
                            </>
                            }
                            {infos.beneficiarios &&
                            <>
                            <div>
                                <span>Quantidade de vidas:</span>
                                {infos.beneficiarios}
                            </div>
                            </>
                            }
                            {infos.contactway &&
                            <>
                            <div>
                                <span>Forma de contato:</span>
                                {infos.contactway}
                            </div>
                            </>
                            }
                            {infos.lifes &&
                            <>
                            <div>
                                <span>Vidas:</span>
                                {infos.lifes}
                            </div>
                            </>
                            }
                            {infos.phone01 &&
                            <>
                            <div>
                                <span>Telefone:</span>
                                {infos.phone01}
                            </div>
                            </>
                            }
                            {infos.phone02 &&
                            <>
                            <div>
                                <span>Telefone:</span>
                                {infos.phone02}
                            </div>
                            </>
                            }
                            {infos.phone03 &&
                            <>
                            <div>
                                <span>Telefone:</span>
                                {infos.phone03}
                            </div>
                            </>
                            }
                            {infos.phone04 &&
                            <>
                            <div>
                                <span>Telefone:</span>
                                {infos.phone04}
                            </div>
                            </>
                            }
                            {infos.email &&
                            <>
                            <div>
                                <span>E-mail:</span>
                                {infos.email}
                            </div>
                            </>
                            }
                            {infos.state &&
                            <>
                            <div>
                                <span>UF:</span>
                                {infos.state}
                            </div>
                            </>
                            }
                            {infos.city &&
                                <>
                                <div>
                                    <span>Cidade:</span>
                                    {infos.city}
                                </div>
                                </>
                            }
                            {infos.date &&
                            <>
                            <h1>Agendamento</h1>
                            <div>
                                
                                <span>Data e hora:</span>
                                {infos.date}
                            </div>
                            </>
                            }
                            {infos.motivo &&
                            <>
                            <div>
                                <span>Motivo:</span>
                                {infos.motivo}
                            </div>
                            </>
                            }
                            {infos.pendencias &&
                            <>
                            <h1 className="title_pendencia">Pendencia</h1>
                            <div>
                                <span>Motivo:</span>
                                {infos.pendencias[0].reason_id}
                            </div>
                            {infos.pendencias[0].reason_id == 1 &&
                                <>
                                    <div className="title_documentsMissing"><h4>DOCUMENTOS FALTANDO</h4></div>
                                        <div className="showDocumentsMissing">
                                            <ul>
                                            {infos.pen_docs[0].map(item => {
                                                return(
                                                    <li>
                                                        <span><strong>{item[3]}</strong></span> 
                                                        <span>{item[4]}</span>
                                                        <span>
                                                            <input
                                                                className="inputSendDocumentMissing"
                                                                type="file"
                                                                id="inputSendDocumentMissing"
                                                            />
                                                            <label for="inputSendDocumentMissing" className="labelSendDocumentMissing">Selecione o anexo</label>
                                                        </span>
                                                    </li>                                                
                                                )

                                            })
                                            
                                            }
                                            
                                            </ul>
                                        </div>
                               
                            
                                </>
                            }
                            </>
                            }
                            {infos.operadora &&
                            <>
                            {infos.status == 1 && 
                            <h1>Pedido de venda</h1>
                            }
                            {infos.status == 0 &&
                            <h1>Orçamento</h1>
                            }
                            <div>
                                <span>Operadora:</span>
                                {infos.operadora}
                            </div>
                            </>
                            }
                            {infos.plano &&
                            <>
                            <div>
                                <span>Plano:</span>
                                {infos.plano}
                            </div>
                            </>
                            }
                            {infos.cobertura &&
                            <>
                            <div>
                                <span>Cobertura:</span>
                                {infos.cobertura}
                            </div>
                            </>
                            }
                            {infos.coparticipacao &&
                            <>
                            <div>
                                <span>Coparticipacao:</span>
                                {infos.coparticipacao}
                            </div>
                            </>
                            }
                            {infos.valorMin &&
                            <>
                            <div>
                                <span>Valor Min:</span>
                                {infos.valorMin}
                            </div>
                            </>
                            }
                            {infos.valorMax &&
                            <>
                            <div>
                                <span>Valor Max:</span>
                                {infos.valorMax}
                            </div>
                            </>
                            }
                            {infos.valorFechado &&
                            <>
                            <div>
                                <span>Valor Fechado:</span>
                                R$ {infos.valorFechado}
                            </div>
                            </>
                            }

                            {infos.retorno &&
                            <>
                            <div>
                                <span>Retorno:</span>
                                {infos.retorno}
                            </div>
                            </>
                            }
                            {infos.tipo &&
                            <>
                            <h1>Coletadas</h1>
                            <div>
                                <span>Tipo:</span>
                                {infos.tipo}
                            </div>
                            </>
                            }
                            {infos.vidas_total &&
                            <>
                            <div>
                                <span>Vidas:</span>
                                {infos.vidas_total}
                            </div>
                            </>
                            }
                            {infos.vidas_0_18 &&
                            <>
                            <div>
                                <span>Vidas de 0 a 18:</span>
                                {infos.vidas_0_18}
                            </div>
                            </>
                            }
                            {infos.vidas_19_23 &&
                            <>
                            <div>
                                <span>Vidas de 19 a 23:</span>
                                {infos.vidas_19_23}
                            </div>
                            </>
                            }
                            {infos.vidas_24_28 &&
                            <>
                            <div>
                                <span>Vidas de 24 a 28:</span>
                                {infos.vidas_24_28}
                            </div>
                            </>
                            }
                            {infos.vidas_29_33 &&
                            <>
                            <div>
                                <span>Vidas de 29 a 33:</span>
                                {infos.vidas_29_33}
                            </div>
                            </>
                            }
                            {infos.vidas_34_38 &&
                            <>
                            <div>
                                <span>Vidas de 34 a 38:</span>
                                {infos.vidas_34_38}
                            </div>
                            </>
                            }
                            {infos.vidas_39_43 &&
                            <>
                            <div>
                                <span>Vidas de 39 a 43:</span>
                                {infos.vidas_39_43}
                            </div>
                            </>
                            }
                            {infos.vidas_44_48 &&
                            <>
                            <div>
                                <span>Vidas de 44 a 48:</span>
                                {infos.vidas_44_48}
                            </div>
                            </>
                            }
                            {infos.vidas_49_53 &&
                            <>
                            <div>
                                <span>Vidas de 49 a 53:</span>
                                {infos.vidas_49_53}
                            </div>
                            </>
                            }
                            {infos.vidas_54_58 &&
                            <>
                            <div>
                                <span>Vidas de 54 a 58:</span>
                                {infos.vidas_54_58}
                            </div>
                            </>
                            }
                            {infos.vidas_59 &&
                            <>
                            <div>
                                <span>Vidas de 59+:</span>
                                {infos.vidas_59}
                            </div>
                            </>
                            }
                            {infos.zone &&
                            <>
                            <div>
                                <span>Bairro/Zona:</span>
                                {infos.zone}
                            </div>
                            </>
                            }
                            {infos.hospitals &&
                            <>
                            <div>
                                <span>Hospitais de preferência:</span>
                                {infos.hospitals}
                            </div>
                            </>
                            }
                            {infos.labs &&
                            <>
                            <div>
                                <span>Laboratorios de preferência:</span>
                                {infos.labs}
                            </div>
                            </>
                            }
                            {infos.illness &&
                            <>
                            <div>
                                <span>Doença pré-existente:</span>
                                {infos.illness}
                            </div>
                            </>
                            }
                            {infos.previousplan &&
                            <>
                            <div>
                                <span>Possui plano anterior:</span>
                                {infos.previousplan}
                            </div>
                            </>
                            }
                            {infos.previousplan == "true" ?
                            
                            <>
                            <div>
                                <span>Operadora:</span>
                                {infos.operator}
                            </div>
                            <div>
                                <span>Plano:</span>
                                {infos.plan}
                            </div>
                            <div>
                                <span>Valor que pagava:</span>
                                {infos.value}
                            </div>
                            <div>
                                <span>Tempo que ficou:</span>
                                {infos.time}
                            </div>

                            </>
                            : ""
                            } 
                            {infos.cnpj_coligado &&
                            <>
                            <div>
                                <span>Possui CNPJ Coligado:</span>
                                {infos.cnpj_coligado}
                            </div>
                            </>
                            }
                        </div>
                        {infos.status_doc &&
                        <div className="documentsList">
                            <span>Documentos anexados</span>
                            <ul id="listDir">
                                {responseApi &&
                                    responseApi.map((item, index) => index > 1 &&   <li> <a href={item[0]+item[1]} download="Documentacao.pdf" target="_blank"> {item[1]} </a></li>)
                                }
                            </ul>
                        </div>  
                        }
                        


                        <div className="content-buttons">
                            <button type="button" className="btn-cancelar" onClick={refreshPage}><img src="../../../btn-cancel.svg"></img> </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}



export default ModalInfo;