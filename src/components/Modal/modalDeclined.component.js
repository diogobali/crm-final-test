import React, { useState } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextDeclined } from './modalDeclined.context'
import './styles.scss';



const ModalDeclined = () => {

    const [formInfo, setFormInfo] = useState({
        reason: '',
        lead: '',
    });

    const sendForm = (e) => {
        const lead = document.querySelector('.lead_decline').value
        const optionsForm = {
            method: 'POST',
            body: JSON.stringify({
                reason: reason,
                leadId: lead,
            })
        };
        fetch('https://moplanseguros.com.br/declinelead.php', optionsForm)
        .then(function(response) {
        })

    }

    const { 
        modalDeclinedState: { message, visible, itemId }, 
        closeModalDeclined,
    } = useModalContextDeclined();



    function refreshPage(){
        window.location.reload();
    } 

    const [reason, setReason] = useState(null);
    
    
    if(!visible) return null;

    return( 
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Declinar Lead</h1>
                    </div>
                    <div className="content">
                        <form onSubmit={sendForm}>
                        <div>
                            {itemId &&
                                <input 
                                    className="lead_decline"
                                    type="text" 
                                    value={itemId} 
                                    style={{display:'none'}}
                                />
                            }
                            <span>Motivo: </span>
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                            >
                                <option value="1">Opção 1</option>
                                <option value="2">Opção 2</option>
                                <option value="3">Opção 3</option>
                            </select>
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



export default ModalDeclined;