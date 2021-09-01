import React, { createContext, useState, useContext, useCallback } from 'react'


import './styles.scss';
// import nextStep from '../Signup';



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

    function Continue1(){
        document.querySelector('.step1').style.display = 'none';
        document.querySelector('.step2').style.display = 'block';
    }

    function Continue2(){
        document.querySelector('.step2').style.display = 'none';
        document.querySelector('.step3').style.display = 'block';
    }

    const valorInput = e => setFormInfo({ ...formInfo, [e.target.name]: e.target.value })



    const [formInfo, setFormInfo] = useState({
        leadId: itemId,
        selectedType: '',
        totalAge: '',
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
        comp: '',

    });

    const sendFormx = (e) => {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                leadId: formInfo.leadId,
                selectedType: formInfo.selectedType,
                totalAge: formInfo.totalAge,
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
                comp: formInfo.comp,
            })
        };
        fetch('https://moplanseguros.com.br/setleadinfo.php', optionsForm)
        .then(function(response) {
        })

    }

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
    }, []);

    const removeComp = useCallback(
        (id) => {
            setComp(comp.filter((c) => c.id !== id));
        },
        [comp]
    );


    

    const newTotalAge = () => {
        // const total = parseInt(firstAge) + parseInt(secondAge) + parseInt(thirdAge) + parseInt(fourthAge) + parseInt(fifthAge) + parseInt(sixthAge) + parseInt(seventhAge) + parseInt(eighthAge) + parseInt(ninethAge) + parseInt(tenthAge)
        // setFormInfo({ ...formInfo, [totalAge]: total })
    }


    function sendForm(e){
        e.preventDefault();

        
    }

    const tellId = (id, value) => {
        const teste = comp.map(x => {
            if(x.id == id){
                return{
                    id: x.id,
                    cnpj: x.cnpj,
                    type: x.type,
                };
            }
            return x;
        });

    }


    return(
            <div className="modal">
                <div className="container">
                <form action="http://24.152.37.228/setleadinfo.php" method="post">
                    <div className="step1">
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
                                    onChange={valorInput}
                                    name="selectedType"
                                >
                                    
                                    <option value="">Selecione...</option>
                                    <option value="adesao">Adesão</option>
                                    <option value="empresarial">Empresarial</option>
                                </select>
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
                                            onBlur={newTotalAge}
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
                                            onBlur={newTotalAge}
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
                                            onBlur={newTotalAge}
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
                                            onBlur={newTotalAge}
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
                                            onBlur={newTotalAge}
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
                                            onBlur={newTotalAge}
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
                                            onBlur={newTotalAge}
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
                                            onBlur={newTotalAge}
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
                                            onBlur={newTotalAge}
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
                                            onBlur={newTotalAge}
                                        />
                                    </div>
                                    <div>
                                        <span>Total</span>
                                        <input 
                                            type="number"
                                            id="idade_total" 
                                            min="0" 
                                            disabled
                                            name="totalAge"
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
                    <div className="step2">
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
                                        placeholder="Escreva o valor pago" 
                                        disabled={previousPlan == "false" || previousPlan == "none" ? "false" : ""}
                                        name="value"
                                        onChange={valorInput}
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
                                    <button type="button" className="btn-cancelar" onClick={ Previous1 }><img src="../../../back-arrow.svg"></img> </button>
                                    <button type="button" className="btn-confirmar" onClick={ Continue2 }><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                                </div>
                        </div>
                        </div>
                        <div className="step3">
                        <div className="title">
                            <h1>Informações sobre CNPJ Coligado</h1>
                        </div>
                        <div className="content">
                             
                            <div>
                                <span>Possui CNPJ Coligado?</span>
                                <select
                                    name="comp"
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
                                                    onChange={(e) => tellId(r.id, e.target.value)}
                                                ></input>
                                            </div>
                                            <div>
                                                <span>Quantidade de vidas (*):</span>
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                ></input>
                                            </div>
                                            <div>
                                                <span>UF:</span>
                                                <select>
                                                    <option>Selecione...</option>
                                                    <option>SP</option>
                                                    <option>RJ</option>
                                                </select>
                                            </div>
                                            <div className="button-remove-company">
                                                <div></div>
                                                <button type="button" onClick={() => removeComp(r.id)}><img src="../../../btn-remove-company.svg"></img></button>
                                            </div>
                                        </div>
                                        </>
                                    ))}

                            </div>
                            
                            <div className="content-buttons">
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