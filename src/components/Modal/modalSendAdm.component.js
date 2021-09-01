import React, { useState, useCallback, useEffect } from 'react';
import { Modal as ModalComponent } from 'antd';
import { useModalContextSendAdm } from './modalSendAdm.context'
import { MdAddAlarm } from 'react-icons/md';

const ModalSendAdm = () => {
    const {
        modalSendAdmState: { visible, itemId }, 
    } = useModalContextSendAdm();

    function refreshPage(){
        window.location.reload();
    } 

    const [responseApi, setResponseApi] = useState()

    // const [selectedFile, setSelectedFile] = useState()
    const [fileName, setFileName] = useState()
    // const [files, setFiles] = useState([])

    // function handleSetAttachment(e) {
    //     if(e.target.files) {
    //         var file = e.target.files[0]
    //         var nameraiz = file.name
    //         var fileType = file.type
    //         var blob = file.slice(0, file.size, 'image/png', );
    //         const newFile = new File([blob], fileName, {type: fileType});
    //         Object.assign(newFile, {nameraiz: nameraiz})
    //         console.log(newFile)
    //         setSelectedFile(newFile)
    //     }
    // }

    // const addFileToList = () => {

    //     if (!selectedFile){
    //         alert("Selecione um arquivo");
    //         return;
    //     }

    //     if (!fileName || fileName == ''){
    //         alert("Selecione um nome");
    //         return;
    //     }

    //     setFiles([...files, selectedFile])

    //     // document.querySelector('#selectFileName').value = ''
    //     document.querySelector('#selectfile').value = ''

    //     // setFileName(undefined)
    //     setSelectedFile(undefined);

    //     console.log(files)
        
    //     // console.log(document.querySelector('#selectFileName').value)
        
    // }

    // const sendForm = () => {
    //     const data = new FormData()
    //     data.append('leadId', itemId)
    //     for(const file of files){
    //         data.append('name', file.name)
    //         data.append('nameraiz', file.nameraiz)
    //     }

    //     fetch('http://locahost/attachdocuments.php', {
    //         method: 'POST',
    //         body: data
    //     })
    // }

    const [image, setImage] = useState();


    const upload_image = () => {
        
        const form_data = new FormData();
        form_data.append('attachment', image);
        form_data.append('leadId', itemId);
        form_data.append('fileName', fileName);

        fetch('http://localhost/attachdocuments.php', {
            method: "POST",
            body: form_data
        }).then(function(response){
            return response;
        }).then(response => response.json())
        .then(response => {
            setResponseApi(response);
        });
    }


    const load_image = () => {
        const form_data = new FormData();
        form_data.append('leadId', itemId);

        fetch('http://localhost/attachdocuments.php', {
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
    }, [itemId]);


    return(
        <ModalComponent
            visible={visible}
        >
            <div className="modal">
                <div className="container">
                    <div className="title">
                        <h1>Anexar Documentação</h1>
                    </div>
                    <div className="content">
                        <form method="post" action="http://localhost/attachdocuments.php" enctype="multipart/form-data">
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
                                onChange={(e) => setFileName(e.target.value)}
                                value={fileName}
                                id="selectFileName"
                            >
                                <option value="">Selecione o nome do arquivo</option>
                                <option value="RG">RG</option>
                                <option value="CNH">CNH</option>
                                <option value="Comprov">COMPROVANTE DE RESIDENCIA</option>
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
                            <span>Documentos deste Lead</span>
                        
                            <ul id="listDir">
                                {responseApi &&
                                    responseApi.map((item, index) => index > 1 &&   <li> <a href={item[0]+item[1]} download="Documentacao.pdf" target="_blank"> {item[1]} </a></li>)
                                }
                            </ul>
                           
                        </div>  
                        <div className="content-buttons">
                            <button type="button" className="btn-cancelar" onClick={refreshPage}><img src="../../../btn-cancel.svg"></img> </button>
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