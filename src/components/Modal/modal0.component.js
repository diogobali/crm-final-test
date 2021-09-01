import React, { useState } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContext0 } from './modal0.context'
import './styles.scss';



const Modal0 = () => {




    const [formInfo, setFormInfo] = useState({
        contactWay: '',
        date: '',
        lead: '',
    });

    const sendForm = (e) => {
        const lead = document.querySelector('.lead').value
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                contactWay: contactWay,
                date: date,
                leadId: lead,
            })
        };
        fetch('http://localhost/recieveform.php', optionsForm)
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

    const [contactWay, setContactWay] = useState(null);
    const [date, setDate] = useState(null);


    
    
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
                                value={contactWay}
                                onChange={(e) => setContactWay(e.target.value)}
                                required
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
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
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