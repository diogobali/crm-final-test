import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextInfo = createContext({});

//Provider
const ModalProviderInfo = ({ children }) => {

    const [modalInfoState, setModalInfoState] = useState({ visible: false });

    const openModalInfo = (payload) => setModalInfoState({ ...payload, visible: true});

    const closeModalInfo = () => setModalInfoState({ visible: false});
    
    return <ModalContextInfo.Provider value={{ modalInfoState, openModalInfo, closeModalInfo }}>
        {children}
    </ModalContextInfo.Provider>
}

//Hook
const useModalContextInfo = () => {
    const context = useContext(ModalContextInfo);
    return context;
};

export { useModalContextInfo, ModalProviderInfo};