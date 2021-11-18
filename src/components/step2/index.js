
import { exit } from 'process';
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format';
import * as yup from 'yup';
import ReactTooltip from 'react-tooltip';
import tipos_de_contrato from '../../jsons/tipos_de_contrato.json';

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
                .test('len', 'Insira um CPF válido.', titularId => titularId.length == 0 || titularId.length == 14)
        })
        .when('selectedType', {
            is: (selectedType) => selectedType == 'empresarial',
            then: yup
                .string()
                .test('len', 'Insira um CNPJ válido.', titularId => titularId.length == 0 || titularId.length == 14)
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
        .string(),
    labs: yup
        .string(),
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

    const [stepvisibility, setStepVisibility] = useState(1);

    function Previous(){
        setStepVisibility(stepvisibility-1);
    }


    const Continue = async () => {
        console.log(formInfo)

        try {
            await validateForm1.validate(formInfo);
            console.log("Deu bom");
        } catch (err) {
            console.log(err);
            alert(err);
            return;
        }
        

        setStepVisibility(stepvisibility+1);
    }


    const valorInput = e => setFormInfo({ ...formInfo, [e.target.name]: e.target.value })

    const [formInfo, setFormInfo] = useState({
        leadId: itemId,
        titularId: '',
        selectedType: '',
        firstAge: 0,
        secondAge: 0,
        thirdAge: 0,
        fourthAge: 0,
        fifthAge: 0,
        sixthAge: 0,
        seventhAge: 0,
        eighthAge: 0,
        ninethAge: 0,
        tenthAge: 0,
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
    const [auxParenteType, setAuxParenteType] = useState();
    const [parenteName, setParenteName] = useState();
    const [titularForParente, setTitularForParente] = useState();
    const [parentes, setParentes] = useState([]);


    const [titularName, setTitularName] = useState();
    const [titulares, setTitulares] = useState([]);
    
    const [titularIdade, setTitularIdade] = useState();
    const [dependenteIdade, setDependenteIdade] = useState();

    const newTitular = useCallback(() => {
        setTitulares((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                nome: titularName,
                idade: titularIdade,
            }
        ]);

    }, [titulares, titularName, titularIdade]);

    useEffect(() => {
        attQuantidades();
    }, [titulares, parentes])

    const attQuantidades = () => {
        const a = titulares.filter((c) => c.idade >= 0 && c.idade <= 18).length + parentes.filter((c) => c.idade >= 0 && c.idade <= 18).length;
        const b = titulares.filter((c) => c.idade >= 19 && c.idade <= 23).length + parentes.filter((c) => c.idade >= 19 && c.idade <= 23).length;
        const c = titulares.filter((c) => c.idade >= 24 && c.idade <= 28).length + parentes.filter((c) => c.idade >= 24 && c.idade <= 28).length;
        const d = titulares.filter((c) => c.idade >= 29 && c.idade <= 33).length + parentes.filter((c) => c.idade >= 29 && c.idade <= 33).length;
        const e = titulares.filter((c) => c.idade >= 34 && c.idade <= 38).length + parentes.filter((c) => c.idade >= 34 && c.idade <= 38).length;
        const f = titulares.filter((c) => c.idade >= 39 && c.idade <= 43).length + parentes.filter((c) => c.idade >= 39 && c.idade <= 43).length;
        const g = titulares.filter((c) => c.idade >= 44 && c.idade <= 48).length + parentes.filter((c) => c.idade >= 44 && c.idade <= 48).length;
        const h = titulares.filter((c) => c.idade >= 49 && c.idade <= 53).length + parentes.filter((c) => c.idade >= 49 && c.idade <= 53).length;
        const i = titulares.filter((c) => c.idade >= 54 && c.idade <= 58).length + parentes.filter((c) => c.idade >= 54 && c.idade <= 58).length;
        const j = titulares.filter((c) => c.idade >= 59).length + parentes.filter((c) => c.idade >= 59).length;
    
        setFormInfo({...formInfo,
            "firstAge": a,
            "secondAge": b,
            "thirdAge": c,
            "fourthAge": d,
            "fifthAge": e,
            "sixthAge": f,
            "seventhAge": g,
            "eighthAge": h,
            "ninethAge": i,
            "tenthAge": j
        })

    }

    const newParente = useCallback(() => {
        setParentes((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                nome: parenteName,
                type: parenteType,
                titularId: titularForParente,
                idade: dependenteIdade,
            }
        ]);
        console.log(parentes);
        attQuantidades();
    }, [parentes, parenteName, parenteType, titularForParente, dependenteIdade]);

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

    const [ document, setDocument ] = useState();
    var valor = 0;
    function handleDocumentCPF(e){
        setDocument(mask(e.target.value, "###.###.###-##", "number"));
    }
    function handleDocumentCNPJ(e){
        setDocument(mask(e.target.value, "##.###.###/####-##", "number"));
    }

    function handleTitularName(e){
        setTitularName(mask(e.target.value, "####################################################", "name"))
    }

    function handleParenteName(e){
        setParenteName(mask(e.target.value, "####################################################", "name"))
    }

    function handleZone(e){
        setFormInfo({ ...formInfo, "zone": mask(e.target.value, "###################", "name")})
    }

    function handleHospitals(e){
        setFormInfo({ ...formInfo, "hospitals": mask(e.target.value, "###################", "name")})
    }

    function handleLabs(e){
        setFormInfo({ ...formInfo, "labs": mask(e.target.value, "###################", "name")})
    }

    function handleIllness(e){
        setFormInfo({ ...formInfo, "illness": mask(e.target.value, "###################", "name")})
    }

    function handlePlan(e){
        setFormInfo({ ...formInfo, "plan": mask(e.target.value, "###################", "text")})
    }

    function handleOperator(e){
        setFormInfo({ ...formInfo, "operator": mask(e.target.value, "###################", "name")})
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


    useEffect(() => { 
        console.log(formInfo.isComp.construtor)

        console.log(formInfo.isComp === "true")
        console.log(formInfo.isComp)
      }, [formInfo.isComp]);

    const [auxDocumentVisibility, setAuxDocumentVisibility] = useState();

    const checkSelected = (e) =>{
        const selected = e.target.selectedOptions[0].getAttribute("data-type");
        if(selected === 'cpf'){
            setAuxDocumentVisibility('adesao');
            console.log(auxDocumentVisibility)
        
        } else if (selected === 'cnpj'){
            setAuxDocumentVisibility('empresarial');
            
        } else if (selected === ''){
            setAuxDocumentVisibility('hidden');
        }
    }

    const [auxParenteTypeVisibility, setAuxParenteTypeVisibility] = useState(false);

    const checkParentesOutros = () => {
        const selected = auxParenteType;
        if(selected == null){
            return;
        }
        if(selected === 'Outros'){
            setAuxParenteTypeVisibility(true);
        } else {
            setAuxParenteTypeVisibility(false);
            setParenteType(selected);
        }
    }

    
    useEffect(() => {
        checkParentesOutros();
    }, [auxParenteType])

    return(
            <div className="modal">
                <div className="container">
                <form onSubmit={sendFormx}>
                    {stepvisibility === 1 &&
                    
                    
                    <div className="step1"
                        onKeyPress={ (e) => {
                            if(e.key === 'Enter' && e.target.id !== 'insertPeople' && e.target.id !== 'insertParente'){
                                e.preventDefault();
                                Continue();
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
                                 {tipos_de_contrato.map(item => {
                                     return(
                                         <option value={item.name} data-type={item.type}>{item.label}</option>
                                     )
                                 })}   
                                    
                                </select>
                            </div>
                            {auxDocumentVisibility === 'adesao' &&
                            <div

                            >
                                <span>CPF do Titular:</span>
                                <input
                                    type="text"
                                    placeholder="000.000.000-00"
                                    name="titularId"
                                    value={document}
                                    onInput={handleDocumentCPF}
                                    onBlur={valorInput}
                                />
                            </div>
                            }
                            {auxDocumentVisibility === 'empresarial' &&
                                <div

                                >
                                    <span>CNPJ do Titular:</span>
                                    <input
                                        type="text"
                                        placeholder="00.000.000/0000-00"
                                        name="titularId"
                                        value={document}
                                        onInput={handleDocumentCNPJ}
                                        onBlur={valorInput}
                                    />
                                </div>
                            }
                            

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
                                        value={titularName}
                                        onChange={handleTitularName}
                                        onBlur={(e) => {setTitularName(e.target.value)}}
                                        onKeyPress={(e) => {
                                            if(e.key == 'Enter'){
                                                newTitular();
                                                e.preventDefault();
                                            }
                                        }}
                                    ></input>
                                    <span>Idade:</span>
                                    <select
                                        onChange={(e) => {setTitularIdade(e.target.value)}}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                        <option value="32">32</option>
                                        <option value="33">33</option>
                                        <option value="34">34</option>
                                        <option value="35">35</option>
                                        <option value="36">36</option>
                                        <option value="37">37</option>
                                        <option value="38">38</option>
                                        <option value="39">39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                        <option value="43">43</option>
                                        <option value="44">44</option>
                                        <option value="45">45</option>
                                        <option value="46">46</option>
                                        <option value="47">47</option>
                                        <option value="48">48</option>
                                        <option value="49">49</option>
                                        <option value="50">50</option>
                                        <option value="51">51</option>
                                        <option value="52">52</option>
                                        <option value="53">53</option>
                                        <option value="54">54</option>
                                        <option value="55">55</option>
                                        <option value="56">56</option>
                                        <option value="57">57</option>
                                        <option value="58">58</option>
                                        <option value="59">59</option>
                                        <option value="60">60</option>
                                        <option value="61">61</option>
                                        <option value="62">62</option>
                                        <option value="63">63</option>
                                        <option value="64">64</option>
                                        <option value="65">65</option>
                                        <option value="66">66</option>
                                        <option value="67">67</option>
                                        <option value="68">68</option>
                                        <option value="69">69</option>
                                        <option value="70">70</option>
                                        <option value="71">71</option>
                                        <option value="72">72</option>
                                        <option value="73">73</option>
                                        <option value="74">74</option>
                                        <option value="75">75</option>
                                        <option value="76">76</option>
                                        <option value="77">77</option>
                                        <option value="78">78</option>
                                        <option value="79">79</option>
                                        <option value="80">80</option>
                                        <option value="81">81</option>
                                        <option value="82">82</option>
                                        <option value="83">83</option>
                                        <option value="84">84</option>
                                        <option value="85">85</option>
                                        <option value="86">86</option>
                                        <option value="87">87</option>
                                        <option value="88">88</option>
                                        <option value="89">89</option>
                                        <option value="90">90</option>
                                        <option value="91">91</option>
                                        <option value="92">92</option>
                                        <option value="93">93</option>
                                        <option value="94">94</option>
                                        <option value="95">95</option>
                                        <option value="96">96</option>
                                        <option value="97">97</option>
                                        <option value="98">98</option>
                                        <option value="99">99</option>


                                        
                                    </select>
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
                                            Insira os dependentes
                                        </span>
                                            <input
                                                type="text"
                                                placeholder="Nome"
                                                id="insertParente"
                                                value={parenteName}
                                                onChange={handleParenteName}
                                                onBlur={(e) => {setParenteName(e.target.value)}}
                                                onKeyPress={(e) => {
                                                    if(e.key == 'Enter'){
                                                        newParente();
                                                        e.preventDefault();
                                                    }
                                                }}
                                            ></input>
                                            <select
                                                onChange={(e) => {setAuxParenteType(e.target.value)}}
                                            >
                                                <option value="">Parentesco</option>
                                                <option value="Pai">Pai</option>
                                                <option value="Mãe">Mãe</option>
                                                <option value="Irmao">Irmão (ã)</option>
                                                <option value="Avo">Avô (a)</option>
                                                <option value="Filho">Filho (a)</option>
                                                <option value="Tio">Tio (a)</option>
                                                <option value="Primo">Primo (a)</option>
                                                <option value="Sobrinho">Sobrinho (a)</option>
                                                <option value="Neto">Neto (a)</option>
                                                <option value="Conjuge">Conjuge</option>
                                                <option value="Cunhado">Cunhado (a)</option>
                                                <option value="Enteado">Enteado (a)</option>
                                                <option value="Outros">Outros</option>
                                            </select>
                                            {auxParenteTypeVisibility &&
                                            <input
                                                type="text"
                                                onChange={(e) => {setParenteType(e.target.value)}}
                                                id="inputParentesOutros"
                                            />
                                            }
                                            
                                            <span>de</span>
                                            <select
                                                onChange={(e) => {setTitularForParente(e.target.value); console.log(parentes)}}
                                            >
                                                <option value="">Selecione...</option>
                                                {
                                                    titulares.map(item => {
                                                        return(
                                                            <option value={item.nome}>{item.nome}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span>Idade:</span>
                                            <select
                                        onChange={(e) => {setDependenteIdade(e.target.value)}}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                        <option value="21">21</option>
                                        <option value="22">22</option>
                                        <option value="23">23</option>
                                        <option value="24">24</option>
                                        <option value="25">25</option>
                                        <option value="26">26</option>
                                        <option value="27">27</option>
                                        <option value="28">28</option>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                        <option value="32">32</option>
                                        <option value="33">33</option>
                                        <option value="34">34</option>
                                        <option value="35">35</option>
                                        <option value="36">36</option>
                                        <option value="37">37</option>
                                        <option value="38">38</option>
                                        <option value="39">39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                        <option value="43">43</option>
                                        <option value="44">44</option>
                                        <option value="45">45</option>
                                        <option value="46">46</option>
                                        <option value="47">47</option>
                                        <option value="48">48</option>
                                        <option value="49">49</option>
                                        <option value="50">50</option>
                                        <option value="51">51</option>
                                        <option value="52">52</option>
                                        <option value="53">53</option>
                                        <option value="54">54</option>
                                        <option value="55">55</option>
                                        <option value="56">56</option>
                                        <option value="57">57</option>
                                        <option value="58">58</option>
                                        <option value="59">59</option>
                                        <option value="60">60</option>
                                        <option value="61">61</option>
                                        <option value="62">62</option>
                                        <option value="63">63</option>
                                        <option value="64">64</option>
                                        <option value="65">65</option>
                                        <option value="66">66</option>
                                        <option value="67">67</option>
                                        <option value="68">68</option>
                                        <option value="69">69</option>
                                        <option value="70">70</option>
                                        <option value="71">71</option>
                                        <option value="72">72</option>
                                        <option value="73">73</option>
                                        <option value="74">74</option>
                                        <option value="75">75</option>
                                        <option value="76">76</option>
                                        <option value="77">77</option>
                                        <option value="78">78</option>
                                        <option value="79">79</option>
                                        <option value="80">80</option>
                                        <option value="81">81</option>
                                        <option value="82">82</option>
                                        <option value="83">83</option>
                                        <option value="84">84</option>
                                        <option value="85">85</option>
                                        <option value="86">86</option>
                                        <option value="87">87</option>
                                        <option value="88">88</option>
                                        <option value="89">89</option>
                                        <option value="90">90</option>
                                        <option value="91">91</option>
                                        <option value="92">92</option>
                                        <option value="93">93</option>
                                        <option value="94">94</option>
                                        <option value="95">95</option>
                                        <option value="96">96</option>
                                        <option value="97">97</option>
                                        <option value="98">98</option>
                                        <option value="99">99</option>
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
                                                        <span><strong>{r.nome}</strong> ({r.idade} anos)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            </li>   
                                        </>
                                    ))}
                                </ul>
                            </div>
                            <div className="title">
                                <h2>Dependentes</h2>
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
                                                            <span><strong>{r.nome} ({r.idade} anos)</strong></span>
                                                        </div>
                                                        <div>
                                                            <span>{r.type} de {r.titularId} </span>
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
                                            value={formInfo.firstAge}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span>19 a 23</span>
                                        <input 
                                            type="number" 
                                            id="idade_19_23" 
                                            min="0"
                                            name="secondAge"
                                            value={formInfo.secondAge}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span>24 a 28</span>
                                        <input 
                                            type="number" 
                                            id="idade_24_28" 
                                            min="0"
                                            name="thirdAge"
                                            value={formInfo.thirdAge}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span>29 a 33</span>
                                        <input 
                                            type="number" 
                                            id="idade_29_33" 
                                            min="0"
                                            name="fourthAge"
                                            value={formInfo.fourthAge}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span>34 a 38</span>
                                        <input 
                                            type="number" 
                                            id="idade_34_38" 
                                            min="0"
                                            name="fifthAge"
                                            value={formInfo.fifthAge}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span>39 a 43</span>
                                        <input 
                                            type="number" 
                                            id="idade_39_43" 
                                            min="0"
                                            name="sixthAge"
                                            value={formInfo.sixthAge}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span>44 a 48</span>
                                        <input 
                                            type="number" 
                                            id="idade_44_48" 
                                            min="0"
                                            name="seventhAge"
                                            value={formInfo.seventhAge}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span>49 a 53</span>
                                        <input 
                                            type="number" 
                                            id="idade_49_53" 
                                            min="0"
                                            name="eighthAge"
                                            value={formInfo.eighthAge}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span>54 a 58</span>
                                        <input 
                                            type="number" 
                                            id="idade_54_58" 
                                            min="0"
                                            name="ninethAge"
                                            value={formInfo.ninethAge}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <span>59+</span>
                                        <input 
                                            type="number" 
                                            id="idade_59" 
                                            min="0"
                                            name="tenthAge"
                                            value={formInfo.tenthAge}
                                            disabled
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
                                    value={formInfo.zone}
                                    onChange={handleZone}
                                 />
                            </div>

                            <div>
                                <span>Hospitais de Preferência:</span>
                                <input 
                                    type="text" 
                                    placeholder="Oswaldo Cruz"
                                    name="hospitals"
                                    value={formInfo.hospitals}
                                    onChange={handleHospitals}
                                 />
                            </div>

                            <div>
                                <span>Laboratórios de Preferência:</span>
                                <input 
                                    type="text" 
                                    placeholder="Fleury" 
                                    name="labs"
                                    onChange={handleLabs}
                                    value={formInfo.labs}
                                />
                            </div>

                            <div>
                                <div className="in-illness-span">
                                    <span>Doença Pré-existente (*):</span>
                                    <p
                                        data-tip='Escreva "Não" para nenhuma.'
                                        className="info-span"
                                    ><img
                                        src="../../../info-icon.svg"
                                    ></img></p>
                                    <ReactTooltip />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Esôfagite"
                                    name="illness"
                                    onChange={handleIllness}
                                    value={formInfo.illness}
                                />
                                
                            </div> 
                            <div className="content-buttons">
                                <button type="button" className="btn-cancelar" onClick={ refreshPage }><img src="../../../btn-cancel.svg"></img> </button>
                                <button type="button" className="btn-confirmar" onClick={Continue}><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                            </div>
                    </div>
                    </div>
                    }
                    {stepvisibility === 2 &&
                    
                    
                    <div className="step2"
                        onKeyPress={ (e) => {
                            if(e.key === 'Enter'){
                                e.preventDefault();
                                Continue();
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
                                        onChange={handleOperator}
                                        value={formInfo.operator}

                                    />
                                </div>

                                <div>
                                    <span>Plano </span>
                                    <input 
                                        type="text" 
                                        placeholder="Escreva o nome do plano" 
                                        disabled={previousPlan == "false" || previousPlan == "none" ? "false" : ""}
                                        name="plan"
                                        onChange={handlePlan}
                                        value={formInfo.plan}
                                    />
                                </div>

                                <div>
                                    <div className="in-illness-span">
                                        <span>Valor</span>
                                        <p
                                            data-tip='Escreva "0" se não souber'
                                            className="info-span"
                                        ><img
                                            src="../../../info-icon.svg"
                                        ></img></p>
                                        <ReactTooltip />
                                    </div>
                                      

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
                                    <select
                                        type="text"
                                        disabled={previousPlan == "false" || previousPlan == "none" ? "false" : ""} 
                                        name="time"
                                        onChange={valorInput}
                                    >
                                        <option value="menos de 12 meses">Menos de 12 meses</option>
                                        <option value="de 12 a 23 meses">De 12 a 23 meses</option>
                                        <option value="mais de 24 meses">Mais de 24 meses</option>
                                    </select>
                                </div>

                                <div className="content-buttons">
                                    <button type="button" className="btn-cancelar" onClick={ refreshPage }><img src="../../../btn-cancel.svg"></img> </button>
                                    <button type="button" className="btn-cancelar" onClick={ Previous }><img src="../../../back-arrow.svg"></img> </button>
                                    <button type="button" className="btn-confirmar" onClick={ Continue }><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                                </div>
                        </div>
                        </div>
                        }
                        {stepvisibility === 3 &&
                        
                        
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
                                <button type="button" className="btn-cancelar" onClick={ Previous }><img src="../../../back-arrow.svg"></img> </button>
                                <button type="submit" className="btn-confirmar"><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                            </div>
                        
                            </div>
                        </div>
                        }
                    
                    </form>
                </div>
            </div>
    )
}

export default Step2;