import React, { useState, useCallback } from 'react'
import Signup from '../Signup'
import './styles.scss'
import Step3 from '../step3'

const Step4 = ({ prevStep, nextStep, handleChange, values }) => {   

    const Continue = e => {
        e.preventDefault();

        nextStep();
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }


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



    return(
<div>
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Informações sobre CNPJ Coligado</h1>
                    </div>
                    <div className="content">
                        <form>      
                            <div>
                                <span>Possui CNPJ Coligado?</span>
                                <select>
                                    <option>Não</option>
                                    <option>Sim</option>
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
                                                <button onClick={() => removeComp(r.id)}><img src="../../../btn-remove-company.svg"></img></button>
                                            </div>
                                        </div>
                                        </>
                                    ))}

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

export default Step4;