import React, { useState } from 'react'
import Signup from '../Signup'
import './styles.scss'

const Step3 = ({ prevStep, nextStep, handleChange, values }) => {   

    const Continue = e => {
        e.preventDefault();
        if(previousPlan == "true"){
            if(operator && plan && value && time){
                nextStep();
            } else {
                alert("Preencha todos os campos obrigatórios.")
            }
        } else if(previousPlan == "false") {
            nextStep();
        } else if (previousPlan == "none"){
            alert("Preencha todos os campos obrigatórios.")
        }
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }


    const [previousPlan, setPreviousPlan] = useState("none");

    const [operator, setOperator] = useState(null);
    const [plan, setPlan] = useState(null);
    const [value, setValue] = useState(null);
    const [time, setTime] = useState(null);


    

    return(
<div>
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Informações sobre plano anterior</h1>
                    </div>
                    <div className="content">
                        <form>      
                            <div>
                                <span>Possui plano anterior?</span>
                                <select
                                    value={previousPlan}
                                    onChange={(e) => setPreviousPlan(e.target.value)}
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
                                    value={operator}
                                    onChange={(e) => setOperator(e.target.value)}
                                    
                                />
                            </div>

                            <div>
                                <span>Plano </span>
                                <input 
                                    type="text" 
                                    placeholder="Escreva o nome do plano" 
                                    disabled={previousPlan == "false" || previousPlan == "none" ? "false" : ""}
                                    value={plan}
                                    onChange={(e) => setPlan(e.target.value)}
                                />
                            </div>

                            <div>
                                <span>Valor</span>
                                <input 
                                    type="text" 
                                    placeholder="Escreva o valor pago" 
                                    disabled={previousPlan == "false" || previousPlan == "none" ? "false" : ""}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </div>

                            <div>
                                <span>Tempo</span>
                                <input 
                                    type="text" 
                                    placeholder="Escreva a quanto tempo possui o plano" 
                                    disabled={previousPlan == "false" || previousPlan == "none" ? "false" : ""} 
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>

                            <div className="content-buttons">
                                <button type="button" className="btn-cancelar" onClick={ Previous }><img src="../../../back-arrow.svg"></img> </button>
                                <button type="submit" className="btn-confirmar" onClick={ Continue }><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step3;