import React, { useState } from 'react';
import { Modal as ModalComponent2 } from 'antd';
import { useModalContext2 } from './modal2.context'

const Modal2 = () => {
    const { 
        modal2State: { message, visible, itemId }, 
    } = useModalContext2();

    function refreshPage(){
        window.location.reload();
    } 

    const [formInfo, setFormInfo] = useState({
        operadora: '',
        plano: '',
        cobertura: '',
        coparticipacao: '',
        valorMin: '',
        valorMax: '',
        primeiroretorno: '',
    });

    const valorInput = e => setFormInfo({ ...formInfo, [e.target.name]: e.target.value })

    const sendForm = (e) => {
        const lead = document.querySelector('.lead2').value
        console.log(lead)
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                leadId: lead,
                operadora: formInfo.operadora,
                plano: formInfo.plano,
                cobertura: formInfo.cobertura,
                coparticipacao: formInfo.coparticipacao,
                valorMin: formInfo.valorMin,
                valorMax: formInfo.valorMax,
                primeiroretorno: formInfo.primeiroretorno,
            })
        };
        fetch('http://localhost/recieveform_orcamento.php', optionsForm)
        .then(function(response) {
            console.log(response)
        })

    }


    return(
        <ModalComponent2 
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Enviar Orçamento</h1>
                    </div>
                    <div className="content">
                        <form onSubmit={sendForm}>
                        <div>
                            {itemId &&
                                <input 
                                    className="lead2"
                                    type="text" 
                                    value={itemId} 
                                    style={{display:'none'}}
                                />
                            }
                            <span>Operadora: </span>
                            <select
                                name="operadora"
                                onChange={valorInput}
                                required

                            >
                                <option value="">Selecione...</option>
                                <option value="1">Operadora 1</option>
                                <option value="2">Operadora 2</option>
                                <option value="3">Operadora 3</option>
                            </select>
                        </div>
                        <div>
                            <span>Plano: </span>
                            <input 
                                type="text" 
                                placeholder="AMIL 300"
                                name="plano"
                                onChange={valorInput}
                                required
                            ></input>
                        </div>
                        <div>
                            <span>Cobertura: </span>
                            <input 
                                type="text" 
                                placeholder="Tipo de Cobertura"
                                name="cobertura"
                                onChange={valorInput}
                                required
                            ></input>
                        </div>
                        <div>
                            <span>Coparticipação: </span>
                            <select
                                name="coparticipacao"
                                onChange={valorInput}
                                required
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
                        <div>
                            <span>Data e horário para primeiro retorno</span>
                            <input 
                                type="datetime-local"
                                name="primeiroretorno"
                                onChange={valorInput} 
                                required   
                            ></input>
                        </div>
                        <div className="content-buttons">
                            <button type="button" className="btn-cancelar" onClick={refreshPage}><img src="../../../btn-cancel.svg"></img> </button>
                            <button type="submit" className="btn-confirmar"><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalComponent2>
    )
}

export default Modal2;