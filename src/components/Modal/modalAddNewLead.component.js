import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextAddNewLead } from './modalAddNewLead.context'
import { MdAddAlarm, MdSentimentVeryDissatisfied, MdSettingsPower } from 'react-icons/md';
import { useUserContext } from '../../contexts/userContext';
import origins from '../../jsons/origins.json';
import tipos_de_contrato from '../../jsons/tipos_de_contrato.json';
import estados_cidades from '../../jsons/estados-cidades.json';

const ModalAddNewLead = () => {

    const { userData, setUserData } = useUserContext();

    const {
        modalAddNewLeadState: { visible }, 
    } = useModalContextAddNewLead();

    function refreshPage(){
        window.location.reload();
    } 

    const [result, setResult] = useState([]);
    const [resultError, setResultError] = useState(0);

    const [nome, setNome] = useState();
    const [origem, setOrigem] = useState();
    const [tipo, setTipo] = useState();
    const [ddd, setDdd] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();
    const [vidas, setVidas] = useState();
    const [uf, setUf] = useState();
    const [cidade, setCidade] = useState();

    const [ listCity, setListCity ] = useState([]);

    const AddNewLead = () => {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                nome: nome,
                origem: origem,
                tipo: tipo,
                ddd: ddd,
                telefone: telefone,
                email: email,
                vidas: vidas,
                uf: uf,
                cidade: cidade,
                user: userData.user.id,
                team: userData.user.team,
            })
        };
        fetch('https://moplanseguros.com.br/addnewlead.php', optionsForm)
        .then(function(response) {
            return response;
        }).then(response => response.json())
        .then(response => {
            setResult(response)
        })

        if(result.result === "0"){
            setResultError(1)
        } else if(result.result === "1"){
            window.location.reload();
        }
    }

    const handleUf = (e) => {
        setUf(e.target.value);
        estados_cidades.estados.forEach(element => {
            if(element.sigla === e.target.value){
                setListCity(element.cidades.map(item => item))
            }
        })
        console.log(listCity)
    }

    const teste = () => {
        console.log(userData)
    }
    
    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Adicionar Novo Lead</h1>
                    </div>
                    <div className="content">
                        {resultError === 1 &&
                        <div className="errorBox">
                            <span>Lead não pôde ser inserido. Telefone ou e-mail já existente</span>
                        </div>
                        }
                        <div>
                            <span>Nome</span>
                            <input
                                type="text"
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Origem</span>
                            <select
                                onChange={(e) => setOrigem(e.target.value)}
                            >
                                <option value="">Selecione uma opção</option>
                            {
                                origins.sort((a,b) => a.label > b.label ? 1 : -1).map(origin => {
                                    return(
                                        <option value={origin.name}>{origin.label}</option>
                                    )
                                })
                            }
                            
                            </select>
                        </div>
                        <div>
                            <span>Tipo do Lead</span>
                            <select
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="Empresarial">Empresarial</option>
                                <option value="Adesao">Adesão</option>
                            </select>
                        </div>
                        <div>
                            <span>DDD</span>
                            <input
                                type="text"
                                placeholder="11"
                                onChange={(e) => setDdd(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Telefone Sem DDD</span>
                            <input
                                type="text"
                                placeholder="912341234"
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>E-mail</span>
                            <input
                                type="text"
                                placeholder="email@dominio.com.br"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Quantidade de Vidas</span>
                            <input
                                type="text"
                                placeholder="0"
                                onChange={(e) => setVidas(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>UF</span>
                            <select
                                onChange={handleUf}
                            >
                                <option value="">Selecione...</option>

                                {estados_cidades.estados.map(item => {
                                    return(
                                        <option value={item.sigla}>{item.nome}</option>
                                    )
                                })}

                            </select>
                        
                        </div>
                        <div>
                            <span>Cidade</span>
                            <select 
                                onChange={(e) => setCidade(e.target.value)}
                            >
                                <option value="">Selecione...</option>

                                {listCity.map(item => {
                                    return(
                                        <option value={item}>{item}</option>
                                    )
                                })

                                }   
                            </select>
                        </div>
                        <div className="content-buttons">
                            <button type="button" className="btn-cancelar" onClick={refreshPage}><img src="../../../btn-cancel.svg"></img> </button>
                            <button type="submit" className="btn-confirmar" onClick={AddNewLead}><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default ModalAddNewLead;