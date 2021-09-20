import { exit } from 'process';
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format';
import * as yup from 'yup';

import './styles.scss';
// import nextStep from '../Signup';
let validateForm1 = yup.object().shape({
    selectedType: yup
        .string()
        .required("Selecione uma opção em tipo de contrato"),
    titularId: yup
        .string()
        .when('selectedType', {
            is: (selectedType) => selectedType == 'adesao',
            then: yup
                .string()
                .min(11)
                .required("Informe o CPF do titular")
        })
        .when('selectedType', {
            is: (selectedType) => selectedType == 'empresarial',
            then: yup
                .string()
                .min(14)
                .required("Informe o CNPJ do titular")
        }),    
    firstAge: yup
        .string()
        .required("Preencha o campo vidas de 0 a 18 anos"),
    secondAge: yup
        .string()
        .required("Preencha o campo vidas de 19 a 23 anos"),
    thirdAge: yup
        .string()
        .required("Preencha o campo vidas de 24 a 28 anos"),
    fourthAge: yup
        .string()
        .required("Preencha o campo vidas de 29 a 33 anos"),
    fifthAge: yup
        .string()
        .required("Preencha o campo vidas de 34 a 38 anos"),
    sixthAge: yup
        .string()
        .required("Preencha o campo vidas de 39 a 43 anos"),
    seventhAge: yup
        .string()
        .required("Preencha o campo vidas de 44 a 48 anos"),
    eighthAge: yup
        .string()
        .required("Preencha o campo vidas de 49 a 53 anos"),
    ninethAge: yup
        .string()
        .required("Preencha o campo vidas de 54 a 58 anos"),
    tenthAge: yup
        .string()
        .required("Preencha o campo vidas acima de 59 anos"),
    zone: yup
        .string()
        .required("Preencha o campo bairro ou zona"),
    hospitals: yup
        .string()
        .required("Preencha o campo hospitais de preferência"),
    labs: yup
        .string()
        .required("Preencha o campo laboratórios de preferência"),
    illness: yup
        .string()
        .required("Preencha o campo doença pre-existente"),
});

let validateForm2 = yup.object().shape({
    previousPlan: yup
        .string()
        .required("Selecione uma opção em plano anterior"),
    operator: yup
        .string()
        .when('previousPlan', {
            is: (previousPlan) => previousPlan == 'true',
            then: yup
                .string()
                .required("Preencha o campo operadora")
        }),
    plan: yup
        .string()
        .when('previousPlan', {
            is: (previousPlan) => previousPlan == 'true',
            then: yup
                .string()
                .required("Preencha o campo plano")
        }),
    value: yup
        .string()
        .when('previousPlan', {
            is: (previousPlan) => previousPlan == 'true',
            then: yup
                .string()
                .required("Preencha o campo valor")
        }),
    time: yup
        .string()
        .when('previousPlan', {
            is: (previousPlan) => previousPlan == 'true',
            then: yup
                .string()
                .required("Preencha o campo tempo")
        }),
    
});




let validateForm3 = yup.object().shape({
    comp: yup
        .string()
        .required("Selecione uma opção em CNPJ Coligado")
    
});

const Step2 = ({ nextStep, itemId }) => {


    function refreshPage(){
        window.location.reload();
    } 

    function Previous1(){
        document.querySelector('.step2').style.display = 'none';
        document.querySelector('.step1').style.display = 'block';
    }

    function Previous2(){
        document.querySelector('.step3').style.display = 'none';
        document.querySelector('.step2').style.display = 'block';
    }

    const Continue1 = async () => {
        console.log(formInfo)

        try {
            await validateForm1.validate(formInfo);
            console.log("Deu bom");
        } catch (err) {
            console.log(err);
            alert(err);
            return;
        }
        

        document.querySelector('.step1').style.display = 'none';
        document.querySelector('.step2').style.display = 'block';
    }

    const Continue2 = async () => {

        console.log(formInfo)

        try {
            await validateForm2.validate(formInfo);
            console.log("Deu bom");
        } catch (err) {
            console.log(err);
            alert(err);
            return;
        }


        document.querySelector('.step2').style.display = 'none';
        document.querySelector('.step3').style.display = 'block';
    }

    const valorInput = e => setFormInfo({ ...formInfo, [e.target.name]: e.target.value })

    const [formInfo, setFormInfo] = useState({
        leadId: itemId,
        titularId: '',
        selectedType: '',
        firstAge: '',
        secondAge: '',
        thirdAge: '',
        fourthAge: '',
        fifthAge: '',
        sixthAge: '',
        seventhAge: '',
        eighthAge: '',
        ninethAge: '',
        tenthAge: '',
        zone: '',
        hospitals: '',
        labs: '',
        illness: '',
        previousPlan: '',
        operator: '',
        plan: '',
        value: '',
        time: '',
        isComp: '',

    });

    const sendFormx = (e) => {
        e.preventDefault();
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                leadId: formInfo.leadId,
                titularId: formInfo.titularId,
                selectedType: formInfo.selectedType,
                parentes: parentes,
                titulares: titulares,
                firstAge: formInfo.firstAge,
                secondAge: formInfo.secondAge,
                thirdAge: formInfo.thirdAge,
                fourthAge: formInfo.fourthAge,
                fifthAge: formInfo.fifthAge,
                sixthAge: formInfo.sixthAge,
                seventhAge: formInfo.seventhAge,
                eighthAge: formInfo.eighthAge,
                ninethAge: formInfo.ninethAge,
                tenthAge: formInfo.tenthAge,
                zone: formInfo.zone,
                hospitals: formInfo.hospitals,
                labs: formInfo.labs,
                illness: formInfo.illness,
                previousPlan: formInfo.previousPlan,
                operator: formInfo.operator,
                plan: formInfo.plan,
                value: formInfo.value,
                time: formInfo.time,
                isComp: formInfo.isComp,
                ...(formInfo.isComp === "true" &&  { comp } )
                
                
                // if: { "isComp": 'true'},
                // then: { "comp": comp}
            })
        };
        console.log(JSON.stringify(optionsForm))
        fetch('https://moplanseguros.com.br/setleadinfo.php', optionsForm)
        .then(function(response) {
            console.log(response)
            window.location.reload();

        })
        .catch((error) => {
            console.log(error)
        });  

    }

    const [parenteType, setParenteType] = useState();
    const [parenteName, setParenteName] = useState();
    const [titularForParente, setTitularForParente] = useState();
    const [parentes, setParentes] = useState([]);


    const [titularName, setTitularName] = useState();
    const [titulares, setTitulares] = useState([]);


    const newTitular = useCallback(() => {
        setTitulares((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                nome: titularName,
            }
        ]);
        console.log(titulares);
    }, [titulares, titularName]);

    const newParente = useCallback(() => {
        setParentes((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                nome: parenteName,
                type: parenteType,
                titularId: titularForParente,
            }
        ]);
        console.log(parentes);
    }, [parentes, parenteName, parenteType, titularForParente]);

    const removeTitular = useCallback(
        (id) => {
            setTitulares(titulares.filter((c) => c.id !== id));
        },
        [titulares]
    );

    const removeParente = useCallback(
        (id) => {
            setParentes(parentes.filter((c) => c.id !== id));
        },
        [parentes]
    );


    const [previousPlan, setPreviousPlan] = useState("none");

    const [comp, setComp] = useState([]);

    const newComp = useCallback(() => {
        setComp((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                cnpj: '',
                type: '',
                matriz: '',
                vidas: '',
                uf: '',
            }     
        ]);
        console.log(comp)
    }, [comp]);


    const removeComp = useCallback(
        (id) => {
            setComp(comp.filter((c) => c.id !== id));
        },
        [comp]
    );


    const tellId = (id, value) => {
        const compData = comp.map(x => {
            if(x.id == id){
                return{
                    ...x,
                    ...value
                };
            }
            return x;
        });
        console.log(compData);
        setComp(compData);
        

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

    useEffect(() => { 
        console.log(formInfo.isComp.construtor)

        console.log(formInfo.isComp === "true")
        console.log(formInfo.isComp)
      }, [formInfo.isComp]);

    const checkSelected = (e) =>{
        const selected = e.target.value;
        if(selected === 'adesao'){
            document.querySelector('#divCPF').style.display = 'flex';
            document.querySelector('#divCNPJ').style.display = 'none';
        
        } else if (selected === 'empresarial'){
            document.querySelector('#divCPF').style.display = 'none';
            document.querySelector('#divCNPJ').style.display = 'flex';
            
        } else if (selected === ''){
            document.querySelector('#divCPF').style.display = 'none';
            document.querySelector('#divCNPJ').style.display = 'none';
        }

    }


    return(
            <div className="modal">
                <div className="container">
                <form onSubmit={sendFormx}>
                    <div className="step1"
                        onKeyPress={ (e) => {
                            if(e.key === 'Enter' && e.target.id !== 'insertPeople' && e.target.id !== 'insertParente'){
                                e.preventDefault();
                                Continue1();
                            }

                        }}
                    >
                    <div className="title">
                        <h1>Coleta de Informações</h1>
                    </div>
                    <div className="content">
                        
                            <div>
                                {itemId &&
                                    <input 
                                        className="lead2"
                                        type="text" 
                                        value={itemId} 
                                        style={{display:'none'}}
                                        name="leadId"
                                    />
                                }
                                <span>Tipo de Contrato (*):</span>
                                <select
                                    onBlur={valorInput}
                                    onChange={checkSelected}
                                    name="selectedType"
                                >
                                    
                                    <option value="">Selecione...</option>
                                    <option value="adesao">Adesão</option>
                                    <option value="empresarial">Empresarial</option>
                                </select>
                            </div>
                            <div
                                id="divCPF"
                            >
                                <span>CPF do Titular (*):</span>
                                <input
                                    type="text"
                                    placeholder="000.000.000-00"
                                    name="titularId"
                                    onChange={(e) => {e.target.value = e.target.value.replace(/\D/g, '')}}
                                    onBlur={valorInput}
                                    maxlength="11"
                                />
                            </div>
                            <div
                                id="divCNPJ"
                            >
                                <span>CNPJ do Titular (*):</span>
                                <input
                                    type="text"
                                    placeholder="00.000.000/0000-00"
                                    name="titularId"
                                    onChange={(e) => {e.target.value = e.target.value.replace(/\D/g, '')}}
                                    onBlur={valorInput}
                                    maxlength="14"
                                />
                            </div>

                            <div
                                id="divParentescos"
                            >
                                <div>
                                    <span>
                                        Insira os titulares
                                    </span>
                                    
                                    <input
                                        type="text"
                                        placeholder="Nome"
                                        id="insertPeople"
                                        onChange={(e) => {setTitularName(e.target.value)}}
                                        onKeyPress={(e) => {
                                            if(e.key == 'Enter'){
                                                newTitular();
                                                e.preventDefault();
                                            }
                                        }}
                                    ></input>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={newTitular}
                                    >Inserir</button>
                                </div>
                            </div>
                            <div
                                id="divParentescos"
                            >
                                <div>
                                    <div>
                                        <span>
                                            Insira os parentes
                                        </span>
                                            <input
                                                type="text"
                                                placeholder="Nome"
                                                id="insertParente"
                                                onChange={(e) => {setParenteName(e.target.value)}}
                                                onKeyPress={(e) => {
                                                    if(e.key == 'Enter'){
                                                        newParente();
                                                        e.preventDefault();
                                                    }
                                                }}
                                            ></input>
                                            <select
                                                onChange={(e) => {setParenteType(e.target.value)}}
                                            >
                                                <option value="">Parentesco</option>
                                                <option value="Pai">Pai</option>
                                                <option value="Mãe">Mãe</option>
                                                <option value="Avo">Avô (a)</option>
                                                <option value="Filho">Filho (a)</option>
                                                <option value="Tio">Tio (a)</option>
                                                <option value="Primo">Primo (a)</option>
                                                <option value="Sobrinho">Sobrinho (a)</option>
                                                <option value="Neto">Neto (a)</option>
                                                <option value="Conjuge">Conjuge</option>
                                                <option value="Cunhado">Cunhado (a)</option>
                                                <option value="Enteado">Enteado (a)</option>
                                            </select>
                                            <span>de</span>
                                            <select
                                                onChange={(e) => {setTitularForParente(e.target.value)}}
                                            >
                                                {
                                                    titulares.map(item => {
                                                        return(
                                                            <option value={item.id}>{item.nome}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={newParente}
                                    >Inserir</button>
                                </div>
                            </div>
                            <div className="title">
                                    <h2>Titulares</h2>
                            </div>
                            <div
                                id="showTitulares"
                            >
                                <ul>
                                {titulares.map((r) => (
                                        <>
                                        
                                            <li>
                                            <div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeTitular(r.id)}
                                                >x</button>
                                                <div>
                                                    <div>
                                                        <span><strong>{r.nome}</strong></span>
                                                    </div>
                                                </div>
                                            </div>
                                            </li>   
                                        </>
                                    ))}
                                </ul>
                            </div>
                            <div className="title">
                                <h2>Parentes</h2>
                            </div>
                            <div
                                id="showTitulares"
                            >
                                <ul>
                                {parentes.map((r) => (
                                        <>
                                            <li>
                                            <div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeParente(r.id)}
                                                >x</button>
                                                <div>
                                                    <div className="parentes">
                                                        <div>
                                                            <span><span>Titular:</span><strong>{r.titular}</strong></span>
                                                        </div>
                                                        <div>
                                                            <span>{r.nome} ( {r.type} )</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </li>   
                                        </>
                                    ))}
                                </ul>
                            </div>
                            <div className="content--idades">
                                <span>Quantidade de vidas por faixa etaria:</span>
                                <div className="content--idades--in">
                                    <div>
                                        <span>0 a 18</span>
                                        <input 
                                            type="number" 
                                            name="firstAge"
                                            id="idade_0_18" 
                                            min="0"
                                            onChange={valorInput}
                                        />
                                    </div>
                                    <div>
                                        <span>19 a 23</span>
                                        <input 
                                            type="number" 
                                            id="idade_19_23" 
                                            min="0"
                                            name="secondAge"
                                            onChange={valorInput}
                                        />
                                    </div>
                                    <div>
                                        <span>24 a 28</span>
                                        <input 
                                            type="number" 
                                            id="idade_24_28" 
                                            min="0"
                                            name="thirdAge"
                                            onChange={valorInput}
                                        />
                                    </div>
                                    <div>
                                        <span>29 a 33</span>
                                        <input 
                                            type="number" 
                                            id="idade_29_33" 
                                            min="0"
                                            name="fourthAge"
                                            onChange={valorInput}
                                        />
                                    </div>
                                    <div>
                                        <span>34 a 38</span>
                                        <input 
                                            type="number" 
                                            id="idade_34_38" 
                                            min="0"
                                            name="fifthAge"
                                            onChange={valorInput}
                                        />
                                    </div>
                                    <div>
                                        <span>39 a 43</span>
                                        <input 
                                            type="number" 
                                            id="idade_39_43" 
                                            min="0"
                                            name="sixthAge"
                                            onChange={valorInput}
                                        />
                                    </div>
                                    <div>
                                        <span>44 a 48</span>
                                        <input 
                                            type="number" 
                                            id="idade_44_48" 
                                            min="0"
                                            name="seventhAge"
                                            onChange={valorInput}
                                        />
                                    </div>
                                    <div>
                                        <span>49 a 53</span>
                                        <input 
                                            type="number" 
                                            id="idade_49_53" 
                                            min="0"
                                            name="eighthAge"
                                            onChange={valorInput}
                                        />
                                    </div>
                                    <div>
                                        <span>54 a 58</span>
                                        <input 
                                            type="number" 
                                            id="idade_54_58" 
                                            min="0"
                                            name="ninethAge"
                                            onChange={valorInput}
                                        />
                                    </div>
                                    <div>
                                        <span>59+</span>
                                        <input 
                                            type="number" 
                                            id="idade_59" 
                                            min="0"
                                            name="tenthAge"
                                            onChange={valorInput}
                                        />
                                    </div>
                            </div>
                            </div>

                            <div>
                                <span>Bairro ou Zona (*):</span>
                                <input 
                                    type="text" 
                                    placeholder="Ipiranga ou Zona Sul"
                                    name="zone"
                                    onChange={valorInput}
                                 />
                            </div>

                            <div>
                                <span>Hospitais de Preferência (*):</span>
                                <input 
                                    type="text" 
                                    placeholder="Oswaldo Cruz"
                                    name="hospitals"
                                    onChange={valorInput}
                                 />
                            </div>

                            <div>
                                <span>Laboratórios de Preferência (*):</span>
                                <input 
                                    type="text" 
                                    placeholder="Fleury" 
                                    name="labs"
                                    onChange={valorInput}
                                />
                            </div>

                            <div>
                                <span>Doença Pré-existente (*):</span>
                                <input 
                                    type="text" 
                                    placeholder="Esôfagite"
                                    name="illness"
                                    onChange={valorInput}
                                />
                            </div> 
                            <div className="content-buttons">
                                <button type="button" className="btn-cancelar" onClick={ refreshPage }><img src="../../../btn-cancel.svg"></img> </button>
                                <button type="button" className="btn-confirmar" onClick={Continue1}><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                            </div>
                    </div>
                    </div>
                    <div className="step2"
                        onKeyPress={ (e) => {
                            if(e.key === 'Enter'){
                                e.preventDefault();
                                Continue2();
                            }

                        }}
                    >
                        <div className="title">
                            <h1>Informações sobre plano anterior</h1>
                        </div>
                        <div className="content">      
                                <div>
                                    <span>Possui plano anterior?</span>
                                    <select
                                        
                                        name="previousPlan"
                                        onChange={valorInput}
                                        onBlur={(e) => setPreviousPlan(e.target.value)}
                                    >
                                        <option value="none" selected>Selecione...</option>
                                        <option value="false">Não</option>
                                        <option value="true">Sim</option>
                                    </select>
                                </div>

                                <div>
                                    <span>Operadora </span>
                                    <input 
                                        type="text"
                                        placeholder="Escreva o nome da operadora" 
                                        disabled={previousPlan == "false" || previousPlan == "none" ? "true" : ""}
                                        name="operator"
                                        onChange={valorInput}
                                    />
                                </div>

                                <div>
                                    <span>Plano </span>
                                    <input 
                                        type="text" 
                                        placeholder="Escreva o nome do plano" 
                                        disabled={previousPlan == "false" || previousPlan == "none" ? "false" : ""}
                                        name="plan"
                                        onChange={valorInput}
                                    />
                                </div>

                                <div>
                                    <span>Valor</span>  

                                    <input 
                                        type="text"
                                        value={value}
                                        onChange={(e) => valueMask(e.target.value)}
                                        onBlur={valorInput}
                                        maxLength="13"
                                        name="value"
                                    />
                                </div>

                                <div>   
                                    <span>Tempo</span>
                                    <input 
                                        type="text" 
                                        placeholder="Escreva a quanto tempo possui o plano" 
                                        disabled={previousPlan == "false" || previousPlan == "none" ? "false" : ""} 
                                        name="time"
                                        onChange={valorInput}
                                    />
                                </div>

                                <div className="content-buttons">
                                    <button type="button" className="btn-cancelar" onClick={ refreshPage }><img src="../../../btn-cancel.svg"></img> </button>
                                    <button type="button" className="btn-cancelar" onClick={ Previous1 }><img src="../../../back-arrow.svg"></img> </button>
                                    <button type="button" className="btn-confirmar" onClick={ Continue2 }><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                                </div>
                        </div>
                        </div>
                        <div className="step3"
                        
                        >
                        <div className="title">
                            <h1>Informações sobre CNPJ Coligado</h1>
                        </div>
                        <div className="content">
                             
                            <div>
                                <span>Possui CNPJ Coligado?</span>
                                <select
                                    name="isComp"
                                    onChange={valorInput}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="false">Não</option>
                                    <option value="true">Sim</option>
                                </select>
                            </div>  
                            <div className="button-add-company">
                                <div></div>
                                <button 
                                    type="button"
                                    onClick={newComp}
                                ><img src="../../../btn-add-company.svg"></img></button>
                            </div>
                            {/* <div>   
                                <span>Quantidade de empresas: </span>
                                <input 
                                    type="number" 
                                    placeholder="0"
                                    value={numberOfCompanies}
                                    onChange={(e) => setNumberOfCompanies(e.target.value)}
                                    onBlur={createCompanies}
                                />
                            </div> */}
                            <div className="companyMain">
                                    {comp.map((r) => (
                                        <>
                                        <div className="companyInfos">
                                            <div>
                                                <span>Matriz:</span>
                                                <input 
                                                    type="checkbox"
                                                ></input>
                                            </div>
                                            <div>
                                                <span>CNPJ (*):</span>
                                                <input 
                                                    type="text"
                                                    placeholder="CNPJ"
                                                    onChange={(e) => tellId(r.id, {cnpj: e.target.value})}
                                                ></input>
                                            </div>
                                            <div>
                                                <span>Quantidade de vidas (*):</span>
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                    onChange={(e) => tellId(r.id, {vidas: e.target.value})}
                                                ></input>
                                            </div>
                                            <div>
                                                <span>UF:</span>
                                                <select
                                                    onChange={(e) => tellId(r.id, {uf: e.target.value})}
                                                >
                                                    <option>Selecione...</option>
                                                    <option>SP</option>
                                                    <option>RJ</option>
                                                </select>
                                            </div>
                                            <div className="button-remove-company">
                                                <div></div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeComp(r.id)}
                                                ><img 
                                                    src="../../../btn-remove-company.svg"
                                                ></img></button>
                                            </div>
                                        </div>
                                        </>
                                    ))}

                            </div>
                            
                            <div className="content-buttons">
                                <button type="button" className="btn-cancelar" onClick={ refreshPage }><img src="../../../btn-cancel.svg"></img> </button>
                                <button type="button" className="btn-cancelar" onClick={ Previous2 }><img src="../../../back-arrow.svg"></img> </button>
                                <button type="submit" className="btn-confirmar"><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                            </div>
                        
                            </div>
                        </div>
                    
                    </form>
                </div>
            </div>
    )
}

export default Step2;