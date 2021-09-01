import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContext3 = createContext({});

//Provider
const ModalProvider3 = ({ children }) => {

    const [modal3State, setState] = useState({ visible: false });

    const openModal3 = (payload) => setState({ ...payload, visible: true});

    return <ModalContext3.Provider value={{ modal3State, openModal3 }}>
        {children}
    </ModalContext3.Provider>
}

//Hook
const useModalContext3 = () => {
    const context = useContext(ModalContext3);
    return context;
};

export { useModalContext3, ModalProvider3};