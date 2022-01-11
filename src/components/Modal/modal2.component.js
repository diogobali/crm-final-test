import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent2 } from 'antd';
import { useModalContext2 } from './modal2.context'
import * as yup from 'yup';
import companies from '../../jsons/companies.json'

let validateForm = yup.object().shape({
    orcamentos: yup
        .array()
        .min(1, "Informe ao menos um orçamento")
    });
        


const Modal2 = () => {
    const { 
        modal2State: { message, visible, itemId }, 
    } = useModalContext2();

    function refreshPage(){
        window.location.reload();
    } 

    const [showMessage, setShowMessage] = useState({
        show: false,
        type: '',
        message: '',
    })

    const [formInfo, setFormInfo] = useState({
        tipo: '',
        operadora: '',
        plano: '',
        cobertura: '',
        coparticipacao: '',
        valor: '',
        primeiroretorno: '',
    });

    const valorInput = e => setFormInfo({ ...formInfo, [e.target.name]: e.target.value })

    useEffect(() => {
        if(showMessage.show){
            setInterval(() => {
                setShowMessage({
                    show: false,
                    type: '',
                    message: '',
                })
            }, 3000)
        }
    }, [showMessage])

    const [orcamentos, setOrcamentos] = useState([])

    const newOrcamento = useCallback(() => {
            setOrcamentos((prevState) => [
                ...prevState,
                {
                    id: prevState.length + 1,
                    tipo: formInfo.tipo,
                    operadora: formInfo.operadora,
                    plano: formInfo.plano,
                    cobertura: formInfo.cobertura,
                    coparticipacao: formInfo.coparticipacao,
                    valor: formInfo.valor,
                }
            ]);

            setFormInfo({
                tipo: '',
                operadora: '',
                plano: '',
                cobertura: '',
                coparticipacao: '',
                valor: '',
            })
            handleValue(0)

            setShowMessage({
                show: true,
                type: 'message success',
                message: 'Orçamento criado com sucesso.'
            })

    }, [orcamentos, setOrcamentos, formInfo]);

    const removeOrcamento = useCallback(
        (id) => {
            setOrcamentos(orcamentos.filter((c) => c.id !== id));
        },
        [orcamentos]
    );
    
    const [image, setImage] = useState();

    


    const sendForm = async (e) => {

        e.preventDefault();

        try {
            await validateForm.validate(formInfo);
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

    function handlePlan(e){
        setFormInfo({ ...formInfo, "plano": mask(e.target.value, "###################", "text")})
    }

    const [ auxOperadora, setAuxOperadora ] = useState();

    function handleOperadora(e){
        if(e.target.value === 'Outra'){
            setAuxOperadora(e.target.value);
        } else {
            setAuxOperadora('');
            setFormInfo({ ...formInfo, "operadora": e.target.value})
        }
    }


    function mask(value, pattern, type) {
        let i = 0;
        var v = '';
        if(type === "number")
        {
            v = value.toString().replace(/[^0-9_]/g, "");
        } else if(type ==="name"){
            v = value.toString().replace(/[^a-z A-Z_]/g, "");
        } else {
            v = value.toString().replace(/[^a-z A-Z0-9_]/g, "");
        }
        return pattern.replace(/#/g, () => {

        let charactere = v[i++];
        return charactere || "";
        });
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

    return(
        <ModalComponent2 
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Enviar Orçamentos</h1>
                    </div>
                    <div className="content send-orçamento">
                        {showMessage.show &&
                            <div className={showMessage.type}>
                                <span>{showMessage.message}</span>
                            </div>
                        }
                        
                        <form onSubmit={sendForm}>
                        <div>
                            <span>Tipo de Orçamento</span>
                            <select
                                name="tipo"
                                onChange={valorInput}
                                value={formInfo.tipo}
                            >
                                <option value="">Selecione...</option>
                                <option value="odonto">Odonto</option>
                                <option value="saude">Saúde</option>
                            </select>
                        </div>
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
                                onChange={handleOperadora}
                                value={formInfo.operadora}
                            >
                                <option value="">Selecione...</option>
                                {
                                    companies.sort((a,b) => a.label > b.label ? 1:-1).map((company) => {
                                        return(
                                            <option value={company.name}>{company.label}</option>
                                        )
                                    })
                                }
                                <option value="Outra">Outra</option>
                            </select>
                            {auxOperadora === 'Outra' &&
                                <input 
                                    placeholder="Qual?"
                                    onChange={valorInput}
                                    name="operadora"
                                />
                            }
                        </div>
                        <div>
                            <span>Plano: </span>
                            <input 
                                type="text" 
                                placeholder="AMIL 300"
                                name="plano"
                                onChange={handlePlan}
                                value={formInfo.plano}
                            ></input>
                        </div>
                        <div>
                            <span>Acomodação: </span>
                            <select
                                name="cobertura"
                                onChange={valorInput}
                                value={formInfo.cobertura}
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
                                value={formInfo.coparticipacao}
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
                                    value={value}
                                    onBlur={valorInput}
                                    onChange={(e) => valueMask(e.target.value)}
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
                            <span>Anexar proposta</span>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                id="selectfile"
                                // onChange={handleSetAttachment}
                                name="attachment"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
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
                                                        <span>Tipo: {r.tipo}</span>
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