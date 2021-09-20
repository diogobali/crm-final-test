import React, { useState, useEffect } from 'react';
import { Modal as ModalComponent4 } from 'antd';
import { useModalContext4 } from './modal4.context';
import companies from '../../jsons/companies.json';

const Modal4 = () => {
    const { 
        modal4State: { visible, itemId }, 
    } = useModalContext4();

    function refreshPage(){
        window.location.reload();
    } 

    function editOrcamento(){
        document.querySelector('.container_orcamento').style.display = 'none';
        document.querySelector('#newOrcamento').style.display = 'block';
    }

    function back(){
        document.querySelector('.container_orcamento').style.display = 'block';
        document.querySelector('#newOrcamento').style.display = 'none';
    }

    const [counterCalls, setCounterCalls] = useState(0);

    const [valorFechado, setValorFechado] = useState();


    const [formInfo, setFormInfo] = useState({
        operadora: '',
        plano: '',
    });

    const valorInput = e => setFormInfo({ ...formInfo, [e.target.name]: e.target.value })

    const editForm = (e) => {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({  
                leadId: itemId,
                operadora: formInfo.operadora,
                plano: formInfo.plano,
                cobertura: formInfo.cobertura,
                coparticipacao: formInfo.coparticipacao,
                valorMin: formInfo.valorMin,
                valorMax: formInfo.valorMax,
            })
        }
        ;
        
        fetch('https://moplanseguros.com.br/editform_orcamento.php', optionsForm)
        
    }

    const acceptOrcamento = () => {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({  
                leadId: itemId,
                orcamentoId: data.id,
                valorFechado: valorFechado,
            })
        };
        fetch('https://moplanseguros.com.br/acceptorcamento.php', optionsForm)
        .then(function(response) {
        window.location.reload();
            
        })

    }

    const [ value, handleValue ] = useState(0);
    var valor = 0;
    function valueMask(e) {
        
        valor = e+ '';
        valor = parseInt(valor.replace(/[\D]+/g, ''))
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        if (valor == 'NaN'){
            valor = '';
        }

        const finalValue = 'R$ ' + valor;
        console.log(valor)
        handleValue(finalValue)
    }
    
    const [data, setData] = useState([]);

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


    return(
        <ModalComponent4 
            visible={visible}
        >
            <div className="modal">
                <div className="container_orcamento">
                            <div className="title">
                                <h2>Orçamento em aberto</h2>
                            </div>
                            <div className="content_orcamento">
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
                                    <span>Valor Minimo: </span>
                                    <span>{data.valorMin}</span>
                                </div>
                                <div> 
                                    <span>Valor Maximo: </span>
                                    <span>{data.valorMax}</span>
                                </div>
                                <div>
                                    <span>Valor fechado</span>  

                                    <input 
                                        type="text"
                                        value={value}
                                        onChange={(e) => valueMask(e.target.value)}
                                        onBlur={(e) => setValorFechado(e.target.value)}
                                        maxLength="13"
                                        name="value"
                                    />
                                </div>
                            </>
                            }
                            <div className="content-buttons">
                                <button type="button" className="btn-cancelar" onClick={refreshPage} title="Voltar"><img src="../../../btn-cancel.svg"></img> </button>
                                <button type="button" className="btn-edit" onClick={editOrcamento} title="Editar orçamento"><img src="../../../btn-edit.svg"></img></button>
                                <button type="submit" className="btn-confirmar"onClick={acceptOrcamento} title="Aprovar orçamento"><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                            </div>
                            </div>
                </div>
                <div className="container" id="newOrcamento">
                    <div className="title">
                        <h1>Editar Orçamento</h1>
                    </div>
                    <div className="content">
                        <form onSubmit={editForm}>
                        <div>
                            {itemId &&
                                <input 
                                    className="lead3"
                                    type="text" 
                                    value={itemId} 
                                    style={{display:'none'}}
                                />
                            }
                        </div>
                        <div>
                            <span>Operadora: </span>
                            {/* <input 
                                type="text"
                                placeholder="Operadora"
                                name="operadora"
                                onChange={valorInput}
                                required
                            ></input> */}
                            <select
                                name="operadora"
                                onChange={valorInput}
                                required
                            >
                            {
                                companies.map(company => {
                                    return(
                                        <option value={company.value}>{company.name}</option>
                                    )
                                })
                            }

                            </select>
                            
                        </div>
                        <div>
                            <span>Plano: </span>
                            <input 
                                type="text"
                                placeholder="Plano"
                                name="plano"
                                onChange={valorInput}
                                required                                
                            ></input>
                        </div>
                        <div>
                            <span>Cobertura: </span>
                            <input 
                                type="text"
                                placeholder="Cobertura"
                                name="cobertura"
                                onChange={valorInput}
                                required                                
                            ></input>
                        </div>
                        <div>
                            <span>Coparticipação: </span>
                            <select
                                required
                                name="coparticipacao"
                                onChange={valorInput}
                            >
                                <option value="">Selecione...</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                        </div>
                        <div>
                            <span>Valor </span>
                            <div>
                                <input 
                                    type="text"
                                    placeholder="Valor Min"
                                    name="valorMin"
                                    onChange={valorInput}
                                    required
                                ></input>
                                <input 
                                    type="text"
                                    placeholder="Valor Max"
                                    name="valorMax"
                                    onChange={valorInput}
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className="content-buttons">
                            <button type="button" className="btn-cancelar" onClick={back}><img src="../../../btn-cancel.svg"></img> </button>
                            <button type="submit" className="btn-confirmar"><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                        </div>
                        </form>
                    </div>
                </div>
            
            </div>
        </ModalComponent4>
    )
}

export default Modal4;