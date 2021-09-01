import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextDeclined = createContext({});

//Provider
const ModalProviderDeclined = ({ children }) => {

    const [modalDeclinedState, setModalDeclinedState] = useState({ visible: false });

    const openModalDeclined = (payload) => setModalDeclinedState({ ...payload, visible: true});

    const closeModalDeclined = () => setModalDeclinedState({ visible: false});
    
    return <ModalContextDeclined.Provider 
                value={{ modalDeclinedState, openModalDeclined, closeModalDeclined }}
            >
        {children}
    </ModalContextDeclined.Provider>
}

//Hook
const useModalContextDeclined = () => {
    const context = useContext(ModalContextDeclined);
    return context;
};

export { useModalContextDeclined, ModalProviderDeclined};