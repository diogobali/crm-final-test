import React, { useState, useCallback } from 'react';
import { Modal as ModalComponent2 } from 'antd';
import { useModalContext2 } from './modal2.context'
import * as yup from 'yup';
import companies from '../../jsons/companies.json'

let validateForm = yup.object().shape({
    operadora: yup
        .string()
        .required("Selecione uma operadora válida"),
    plano: yup
        .string()
        .required("Informe um plano"),
    cobertura: yup
        .string()
        .required("Informe um tipo de cobertura"),
    coparticipacao: yup
        .string()
        .required("Selecione uma opção em Coparticipacao"),
    valor: yup
        .string()
        .required("Informe um valor"),
    primeiroretorno: yup
        .string()
        .required("Informe uma data para o primeiro retorno")
    });
        


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
        valor: '',
        primeiroretorno: '',
    });

    const valorInput = e => setFormInfo({ ...formInfo, [e.target.name]: e.target.value })

    const [orcamentos, setOrcamentos] = useState([])

    const newOrcamento = useCallback(() => {
            setOrcamentos((prevState) => [
                ...prevState,
                {
                    id: prevState.length + 1,
                    operadora: formInfo.operadora,
                    plano: formInfo.plano,
                    cobertura: formInfo.cobertura,
                    coparticipacao: formInfo.coparticipacao,
                    valor: formInfo.valor,
                }
            ]);
            console.log(orcamentos)
    }, [orcamentos, setOrcamentos, formInfo]);

    const removeOrcamento = useCallback(
        (id) => {
            setOrcamentos(orcamentos.filter((c) => c.id !== id));
        },
        [orcamentos]
    );
    

    const sendForm = async (e) => {

        e.preventDefault();

        try {
            await validateForm.validate(formInfo);
            console.log("Deu bom");
        } catch (err) {
            console.log(err);
            alert(err);
            return;
        }


        const lead = document.querySelector('.lead2').value

        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                leadId: lead,
                orcamentos: orcamentos,
                primeiroretorno: formInfo.primeiroretorno,
            })
        };
        fetch('https://moplanseguros.com.br/recieveform_orcamento.php', optionsForm)
        .then(function(response) {
        window.location.reload();

        })

    }
    console.log(companies);

    return(
        <ModalComponent2 
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Enviar Orçamentos</h1>
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
                                placeholder="AMIL 300"
                                name="plano"
                                onChange={valorInput}
                            ></input>
                        </div>
                        <div>
                            <span>Acomodação: </span>
                            <select
                        
                                name="cobertura"
                                onChange={valorInput}
                            >
                                <option value="">Selecione....</option>
                                <option value="apartamento">Apartamento</option>
                                <option value="enfermaria">Enfermaria</option>
                            </select>
                        </div>
                        <div>
                            <span>Coparticipação: </span>
                            <select
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
                                    placeholder="Valor"
                                    name="valor"
                                    onChange={valorInput}
                                ></input>
                            </div>
                        </div>
                        <div>
                            <span>Data e horário para primeiro retorno</span>
                            <input 
                                type="datetime-local"
                                name="primeiroretorno"
                                onChange={valorInput} 
                            ></input>
                        </div>
                        <div>
                                <button
                                    type="button"
                                    onClick={newOrcamento}
                                >Criar Orçamento</button>
                        </div>

                        <div className="showOrcamentos">
                        <ul>
                                {orcamentos.map((r) => (
                                        <>
                                            <li>
                                            <div>
                                                
                                                <div>
                                                    <div className="showOrcamento">
                                                        <span>Operadora: {r.operadora}</span>
                                                        <span>Plano: {r.plano}</span>
                                                        <span>Acomodação: {r.cobertura}</span>
                                                        <span>Coparticipação: {r.coparticipacao}</span>
                                                        <span>Valor: {r.valor}</span>
                                                        <button 
                                                            type="button" 
                                                            onClick={() => removeOrcamento(r.id)}
                                                        >Remover</button>
                                                    </div>
                                                </div>
                                            </div>
                                            </li>   
                                        </>
                                    ))}
                            </ul>
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