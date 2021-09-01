import React from 'react';
import { Modal as ModalComponent4 } from 'antd';
import { useModalContext4 } from './modal4.context'

const Modal4 = () => {
    const { 
        modal4State: { visible }, 
    } = useModalContext4();

    function refreshPage(){
        window.location.reload();
    } 

    

    return(
        <ModalComponent4 
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Aguardar Documentação</h1>
                    </div>
                    <div className="content">
                        <form>
                        <div>
                            <span>Operadora escolhida pelo cliente:</span>
                            <select>
                                <option>Opcao 1</option>
                                <option>Opcao 2</option>
                                <option>Opcao 3</option>
                            </select>
                        </div>
                        <div>
                            <span>Plano:</span>
                            <select>
                                <option>Opcao 1</option>
                                <option>Opcao 2</option>
                                <option>Opcao 3</option>
                            </select>
                        </div>
                        <div>
                            <span>Documentação necessária:</span>
                            <div className="documentacao-necessaria">
                                <p>RG, CPF, COMPR. RESIDENCIA, COTAÇÃO ENVIADA</p>
                            </div>
                        </div>
                        {/* <div>
                            <span>Anexar</span>
                            <input type="file" accept=".zip,.rar,.jpg,.jpeg,.png,.pdf" multiple></input>
                        </div> */}
                        
                        <div className="content-buttons">
                            <button type="button" className="btn-cancelar" onClick={refreshPage}><img src="../../../btn-cancel.svg"></img> </button>
                            <button type="submit" className="btn-confirmar"><img src="../../../btn-confirm.svg" alt="Botão de confirmar"></img></button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </ModalComponent4>
    )
}

export default Modal4;