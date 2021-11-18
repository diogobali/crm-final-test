import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextApproveAdm } from './modalApproveAdm.context'
import platforms from '../../jsons/platforms.json';
import { platform } from 'os';

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

    function handleValor(e){
        setValor(mask(e.target.value, "###################", "value"))
    }

    function handleProposta(e){
        setProposta(mask(e.target.value, "###################", "number"))
    }

    function mask(value, pattern, type) {
        let i = 0;
        var v = '';
        if(type === "number")
        {
            v = value.toString().replace(/[^0-9_]/g, "");
        } else if(type ==="name"){
            v = value.toString().replace(/[^a-z A-Z_]/g, "");
        } else if(type === "value"){
            v = value+ '';
            v = parseInt(v.replace(/[\D]+/g, ''))
            v = v + '';
            v = v.replace(/([0-9]{2})$/g, ",$1");
            if (v.length > 6) {
                v = v.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }

            if (v == 'NaN'){
                v = '';
            }

            v = 'R$ ' + v;

        } else {
            v = value.toString().replace(/[^a-z A-Z0-9_]/g, "");
        }
        return pattern.replace(/#/g, () => {

        let charactere = v[i++];
        return charactere || "";
        });
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
                                        type="text"
                                        onChange={handleValor}
                                        value={valor}
                                    />
                                </div>
                                <div>
                                    <span>Plataforma:</span>
                                    <select
                                        onChange={(e) => setPlataforma(e.target.value)}
                                    >
                                        <option value="">Selecione...</option>
                                        {
                                            platforms.sort((a,b) => a.label > b.label ? 1 : -1).map((platform) => {
                                                return(
                                                    <option value={platform.name}>{platform.label}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                                <div>
                                    <span>Nº da Proposta</span>
                                    <input 
                                        type="text"
                                        onChange={handleProposta}
                                        value={proposta}
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