import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextSendAdm } from './modalSendAdm.context'
import * as yup from 'yup';
import { MdAddAlarm } from 'react-icons/md';

const ModalSendAdm = () => {
    const {
        modalSendAdmState: { visible, itemId }, 
    } = useModalContextSendAdm();

    function refreshPage(){
        window.location.reload();
    } 


    const [responseApi, setResponseApi] = useState([])
    const [fileName, setFileName] = useState()
    const [fileOwner, setFileOwner] = useState()

    const [image, setImage] = useState();

    const upload_image = () => {
        const form_data = new FormData();
        form_data.append('attachment', image);
        form_data.append('leadId', itemId);
        form_data.append('fileName', fileName);
        form_data.append('fileOwner', fileOwner);

        fetch('https://moplanseguros.com.br/attachdocuments.php', {
            method: "POST",
            body: form_data
        }).then(function(response){
            return response;
        }).then(response => response.json())
        .then(response => {
            setResponseApi(response);
        });
    }


    const [ isFileNameOthers, setIsFileNameOthers ] = useState(false)

    const handleFileName = (e) => {
        if(e === "OUTROS"){
            setIsFileNameOthers(true);
            setFileName('');
        } else {
            setFileName(e)
        }
    }

    const [people, setPeople] = useState([]);
    async function load_people() {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                leadId: itemId,
            })
        };
        const response = await fetch("https://moplanseguros.com.br/getpeople.php", optionsForm)
        const json = await response.json();
        setPeople(json);
    }

    const load_image = () => {
        const form_data = new FormData();
        form_data.append('leadId', itemId);

        fetch('https://moplanseguros.com.br/attachdocuments.php', {
            method: "POST",
            body: form_data
        }).then(function(response){
            return response;
        }).then(response => response.json())
        .then(response => {
            setResponseApi(response);
        });
    }
    useEffect(() => {
        load_image() 
        load_people()
    }, [itemId]);

    const [data, setData] = useState([]);
    const [counterCalls, setCounterCalls] = useState(0);


    async function fetchApi () {
        const optionsFormGet = {
            method: 'POST',
            body: JSON.stringify({
                leadId: itemId,
                final: '1',
            })
        };

        if(counterCalls === 0) {
            const response = await fetch("https://moplanseguros.com.br/getorcamentos.php", optionsFormGet)
            const json = await response.json();
            setData(json);
            setCounterCalls(counterCalls + 1);
        }
        console.log(data.leadId)
        
    }

    if(counterCalls === 0) fetchApi();

    const sendAdm = () => {
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({  
                leadId: itemId,
                cancelamos: shallWeCancel,
                dateToCancel: dateToCancel,
                ageGroupValue1: ageGroupValue1,
                ageGroupValue2: ageGroupValue2,
                ageGroupValue3: ageGroupValue3,
                ageGroupValue4: ageGroupValue4,
                ageGroupValue5: ageGroupValue5,
                ageGroupValue6: ageGroupValue6,
                ageGroupValue7: ageGroupValue7,
                ageGroupValue8: ageGroupValue8,
                ageGroupValue9: ageGroupValue9,
                ageGroupValue10: ageGroupValue10,
                orcamentoId: data.orcamentos[0][6],
            })
        };
        fetch('https://moplanseguros.com.br/sendadm.php', optionsForm)
        .then(function(response) {
            console.log(response);
        })
    }

    const [peso, setPeso] = useState();
    const [altura, setAltura] = useState();
    const [nascDate, setNascDate] = useState();

    const calcImc = (index) => {
        var imc = 0;
        var result = '';
        imc = peso / (altura * altura)
        console.log(imc);

        if(imc < 18.5){
            result = 'Peso Baixo'
        } else if (imc >= 18.5 && imc <= 24.9){
            result = 'Peso Normal'
        } else if (imc >= 25 && imc <= 29.9){
            result = 'Sobrepeso'
        } else if (imc >= 30 && imc <= 34.9){
            result = 'Obesidade (Grau 1)'
        } else if (imc >= 35 && imc <= 39.9){
            result = 'Obesidade Severa (Grau 2)'
        } else if (imc >= 40){
            result = 'Obesidade Morbida (Grau 3)'
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

    const [ shallWeCancel, setShallWeCancel ] = useState(0);
    const [ dateToCancel, setDateToCancel ] = useState(0);

    const [ peopleData, setPeopleData ] = useState([]);

    const handlePeopleData = useCallback((peopleName) => {
        setPeopleData((prevState) => [
            ...prevState,
            {
                id: prevState.length + 1,
                nome: peopleName,
                peso: peso,
                altura: altura,
                nasc: nascDate,
            }
        ])

        console.log(peopleData);
    }, [peso, altura])

    const [ ageGroupValue1, setAgeGroupValue1 ] = useState();
    const [ ageGroupValue2, setAgeGroupValue2 ] = useState();
    const [ ageGroupValue3, setAgeGroupValue3 ] = useState();
    const [ ageGroupValue4, setAgeGroupValue4 ] = useState();
    const [ ageGroupValue5, setAgeGroupValue5 ] = useState();
    const [ ageGroupValue6, setAgeGroupValue6 ] = useState();
    const [ ageGroupValue7, setAgeGroupValue7 ] = useState();
    const [ ageGroupValue8, setAgeGroupValue8 ] = useState();
    const [ ageGroupValue9, setAgeGroupValue9 ] = useState();
    const [ ageGroupValue10, setAgeGroupValue10 ] = useState();
    const [ totalValue, setTotalValue ] = useState();
    const [ valueTotal, setValueTotal ] = useState();
    const [ discountValue, setDiscountValue ] = useState();

    // useEffect(() => {
    //     setTotalValue((ageGroupValue1 + ageGroupValue2 + ageGroupValue3 + ageGroupValue4 + ageGroupValue5 + ageGroupValue6 + ageGroupValue7 + ageGroupValue8 + ageGroupValue9 + ageGroupValue10) - discountValue)
    // }, discountValue, ageGroupValue1, ageGroupValue10, ageGroupValue2, ageGroupValue3, ageGroupValue4, ageGroupValue5, ageGroupValue6, ageGroupValue7, ageGroupValue8, ageGroupValue9)

    function handleAgeGroupValue1(e){
        setAgeGroupValue1(mask(e.target.value, "###################", "value"))
    }
    function handleAgeGroupValue2(e){
        setAgeGroupValue2(mask(e.target.value, "###################", "value"))
    }
    function handleAgeGroupValue3(e){
        setAgeGroupValue3(mask(e.target.value, "###################", "value"))
    }
    function handleAgeGroupValue4(e){
        setAgeGroupValue4(mask(e.target.value, "###################", "value"))
    }
    function handleAgeGroupValue5(e){
        setAgeGroupValue5(mask(e.target.value, "###################", "value"))
    }
    function handleAgeGroupValue6(e){
        setAgeGroupValue6(mask(e.target.value, "###################", "value"))
    }
    function handleAgeGroupValue7(e){
        setAgeGroupValue7(mask(e.target.value, "###################", "value"))
    }
    function handleAgeGroupValue8(e){
        setAgeGroupValue8(mask(e.target.value, "###################", "value"))
    }
    function handleAgeGroupValue9(e){
        setAgeGroupValue9(mask(e.target.value, "###################", "value"))
    }
    function handleAgeGroupValue10(e){
        setAgeGroupValue10(mask(e.target.value, "###################", "value"))
    }

    function handleDiscountValue(e){
        setDiscountValue(mask(e.target.value, "###################", "value"))
    }

    if(data.titulares && data.dependentes){  
        var newArray = data.titulares.concat(data.dependentes);
    }
    

    const teste = () => {
        console.log(data);
    }

    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Finalizar</h1>
                        <button type="button" onClick={teste}>Teste</button>
                    </div>
                    <div className="content">
                        {data.orcamentos &&
                        data.orcamentos.map(data => {
                            return(
                                data.map(data => {
                                    return(
                                        <>
                                        <div>
                                            <span>Operadora:</span>
                                            <span>{data[0]}</span>
                                        </div>
                                        <div>
                                            <span>Plano:</span>
                                            <span>{data[1]}</span>
                                        </div>
                                        <div>
                                            <span>Valor Fechado:</span>
                                            <span>{data[4]}</span>
                                        </div>
                                        <div>
                                            <span>Valor de Desconto:</span>
                                            <input
                                                type="text"
                                                onChange={handleDiscountValue}
                                                value={discountValue}
                                            />
                                        </div>
                                        </>
                                    )
                                })
                           
                            )
                        })}

                            <div>
                                <span>Cancelamento por nós?</span>
                                <div>
                                    <select
                                        onChange={(e) => {setShallWeCancel(e.target.value)}}
                                    >
                                        <option value="0">Não</option>
                                        <option value="1">Sim</option>
                                    </select>

                                    <input
                                        type="date"
                                        onChange={(e) => {setDateToCancel(e.target.value)}}
                                    />
                                </div>
                            </div>
                    <div className="title">
                        <h1>Valores por faixa etaria</h1>
                    </div>
                    <div className="content valores-por-faixa-etaria">
                        <div>
                            <div>
                                <span>0-18</span>
                                <input
                                    type="text"
                                    onChange={handleAgeGroupValue1}
                                    value={ageGroupValue1}
                                />
                            </div>
                            <div>
                                <span>19-23</span>
                                <input 
                                    type="text"
                                    onChange={handleAgeGroupValue2}
                                    value={ageGroupValue2}
                                />
                            </div>
                            <div>
                                <span>24-28</span>
                                <input 
                                    type="text"
                                    onChange={handleAgeGroupValue3}
                                    value={ageGroupValue3}
                                />
                            </div>
                            <div>
                                <span>29-33</span>
                                <input 
                                    type="text"
                                    onChange={handleAgeGroupValue4}
                                    value={ageGroupValue4}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>34-38</span>
                                <input 
                                    type="text"
                                    onChange={handleAgeGroupValue5}
                                    value={ageGroupValue5}
                                />
                            </div>
                            <div>
                                <span>39-43</span>
                                <input 
                                    type="text"
                                    onChange={handleAgeGroupValue6}
                                    value={ageGroupValue6}
                                />
                            </div>
                            <div>
                                <span>44-48</span>
                                <input 
                                    type="text"
                                    onChange={handleAgeGroupValue7}
                                    value={ageGroupValue7}
                                />
                            </div>
                            <div>
                                <span>49-53</span>
                                <input 
                                    type="text"
                                    onChange={handleAgeGroupValue8}
                                    value={ageGroupValue8}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>54-58</span>
                                <input 
                                    type="text"
                                    onChange={handleAgeGroupValue9}
                                    value={ageGroupValue9}
                                />
                            </div>
                            <div>
                                <span>59+</span>
                                <input 
                                    type="text"
                                    onChange={handleAgeGroupValue10}
                                    value={ageGroupValue10}
                                />
                            </div>
                        </div>
                            
                    </div>
                    <div className="title">
                        <h1>Beneficiarios</h1>
                    </div>
                    <div className="content">
                        {newArray &&
                        newArray.map((item, index) => {
                            return(
                                item.map((item, index) => {
                                    return(
                                        <>
                                        <div>
                                            {item[0]}
                                            
                                            <div className="dataToIMC">
                                                <span>
                                                    Data de Nascimento
                                                </span>
                                                <input
                                                    type="date"
                                                    onChange={(e) => setNascDate(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Peso em quilos. Ex: 82.30"
                                                    onChange={(e) => setPeso(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Altura em metros. Ex: 1.82"
                                                    onChange={(e) => setAltura(e.target.value)}
                                                    onBlur={calcImc(index)}
                                                />
                                                {/* <button
                                                    type="button"
                                                    onClick={() => handlePeopleData(item[0])}
                                                >Confirmar</button> */}
                                                {/* <input
                                                    type="text"
                                                    name={"teste"+index}
                                                /> */}
                                            </div>
                                        </div>
                                        </>
                                    )
                                })
                            )
                        })}
                        
                    </div>


                            
                        <form onSubmit={sendAdm}>
                        <div id="msg" className="msg">

                        </div>
                        
                        <div>
                            {itemId &&
                                <input 
                                    name="lead_id"
                                    type="text"
                                    value={itemId} 
                                    style={{display:'none'}}
                                />
                            }
                            <select
                                onChange={(e) => handleFileName(e.target.value)}
                                value={fileName}
                                id="selectFileName"
                            >
                                <option value="">Selecione o nome do arquivo</option>
                                <option value="RG">RG</option>
                                <option value="CNH">CNH</option>
                                <option value="Comprov">COMPROVANTE DE RESIDENCIA</option>
                                <option value="CARTEIRINHA">CARTEIRINHA</option>
                                <option value="COMPROV. PAGAMENTO">COMPROV. PAGAMENTO</option>
                                <option value="OUTROS">OUTROS</option>
                            </select>
                            {isFileNameOthers &&
                                <input 
                                    type="text"
                                    onChange={(e) => setFileName(e.target.value)}
                                    placeholder="Nome do documento. Ex: Frente do RG"
                                />
                            }
                            <select
                                onChange={(e) => setFileOwner(e.target.value)}
                            >
                                <option value="">Selecione o dono do documento</option>
                                <option value="empresa">Empresa</option>
                                {
                                    people.titulares && 
                                    people.titulares.map(item => {
                                        return(
                                            item.map(item => {
                                                return(
                                                    <option value={item[0]}>{item[0]} (Titular)</option>
                                                )
                                            })
                                        )
                                    })
                                }
                                {
                                    people.dependentes &&
                                    people.dependentes.map(item => {
                                        return(
                                            item.map(item => {
                                                return(
                                                    <option value={item[0]}>{item[0]} ({item[1]} de {item[3]})</option>
                                                )
                                            })
                                        )
                                    })
                                }
                                

                            </select>
                            <input 
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                id="selectfile"
                                // onChange={handleSetAttachment}
                                name="attachment"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <button
                                type="button"
                                onClick={upload_image}
                                className="btn-upload"                            
                            ><img src="../../../btn-send-black.svg"></img></button>
                        </div>
                        <div className="documentsList">
                            <div>
                                <h3>Documentos Empresa</h3>
                                <ul id="listDir">
                                    {responseApi.empresa &&
                                        responseApi.empresa.map((item, index) => index > 1 &&   <li> <a href={`https://moplanseguros.com.br/uploads/${itemId}/empresa/${item[1]}`} download target="_blank">{item[1]}</a></li>)
                                    }
                                </ul>
                            </div>
                            <div>
                                <h3>Documentos Titulares e Dependentes</h3>
                                <ul id="listDir">
                                    {responseApi.geral &&
                                        responseApi.geral.map((item, index) => index > 1 &&   <li> <a href={`https://moplanseguros.com.br/uploads/${itemId}/${item[1]}`} download target="_blank"> {item[1]} </a></li>)
                                    }
                                </ul>
                            </div>
                        </div>  
                        <div className="content-buttons">
                            <button type="button" className="btn-cancelar" onClick={refreshPage}><img src="../../../btn-cancel.svg"></img> </button>
                            <div className="confirm-documents-up">
                            <button type="submit" className="btn-confirmar"><img src="../../../btn-confirm.svg"></img> </button>
                            <div className="confirm-documents">
                                <input
                                    type="checkbox"
                                    required
                                    name="is-documents-ok"
                                    id="is-documents-ok"
                                ></input>
                                <label 
                                    for="is-documents-ok"
                                >Confirmo que os documentos necessários foram anexados.</label>
                            </div>
                        </div>
                            {/* <button type="button" className="btn-confirmar" onClick={sendForm}><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button> */}
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default ModalSendAdm;