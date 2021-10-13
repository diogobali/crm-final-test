import React, { useState } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContext0 } from './modal0.context'
import './styles.scss';
import * as yup from 'yup';


let validateForm = yup.object().shape({
    contactWay: yup
        .string()
        .required("Selecione uma opção em forma de contato"),
    date: yup
        .string()
        .required("Selecione uma data válida")
    });




const Modal0 = () => {


    const valorInput = e => setFormInfo({ ...formInfo, [e.target.name]: e.target.value })


    const [formInfo, setFormInfo] = useState({
        contactWay: '',
        date: '',
        lead: '',
    });

    const sendForm = async (e) => {
        try {
            await validateForm.validate(formInfo);
            console.log("Deu bom");
        } catch (err) {
            console.log(err);
            alert(err);
            return;
        }


        const lead = document.querySelector('.lead').value
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                contactWay: formInfo.contactWay,
                date: formInfo.date,
                leadId: lead,
            })
        };
        fetch('https://moplanseguros.com.br/recieveform.php', optionsForm)
        .then(function(response) {
        })

    }

    const { 
        modal0State: { visible, itemId }, 
        closeModal0,
    } = useModalContext0();



    function refreshPage(){
        window.location.reload();
    }     
    
    if(!visible) return null;

    return( 
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Agendar Retorno</h1>
                    </div>
                    <div className="content">
                        <form onSubmit={sendForm}>
                        <div>
                            {itemId &&
                                <input 
                                    className="lead"
                                    type="text" 
                                    value={itemId} 
                                    style={{display:'none'}}
                                />
                            }
                            <span>Forma de contato:</span>
                            <select
                                onChange={valorInput}
                                name="contactWay"
                            >
                                <option value="">Selecione...</option>
                                <option value="wpp">WhatsApp</option>
                                <option value="email">E-mail</option>
                                <option value="tel">Telefone</option>
                            </select>
                        </div>
                        <div>
                            <span>Data e horário:</span>
                            <input
                                name="date"
                                onChange={valorInput}
                                type="datetime-local"
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
        </ModalComponent>
    )
}



export default Modal0;