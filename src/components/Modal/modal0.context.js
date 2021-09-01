
import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContext0 = createContext({});

//Provider
const ModalProvider0 = ({ children }) => {

    const [modal0State, setModal0State] = useState({ visible: false });

    const openModal0 = (payload) => setModal0State({ ...payload, visible: true});

    const closeModal0 = () => setModal0State({ visible: false});
    
    return <ModalContext0.Provider value={{ modal0State, openModal0, closeModal0 }}>
        {children}
    </ModalContext0.Provider>
}

//Hook
const useModalContext0 = () => {
    const context = useContext(ModalContext0);
    return context;
};

export { useModalContext0, ModalProvider0};