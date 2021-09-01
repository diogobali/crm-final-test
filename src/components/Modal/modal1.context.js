import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContext1 = createContext({});

//Provider
const ModalProvider1 = ({ children }) => {

    const [modal1State, setState] = useState({ visible: false });

    const openModal1 = (payload) => setState({ ...payload, visible: true});

    return <ModalContext1.Provider value={{ modal1State, openModal1 }}>
        {children}
    </ModalContext1.Provider>
}

//Hook
const useModalContext1 = () => {
    const context = useContext(ModalContext1);
    return context;
};

export { useModalContext1, ModalProvider1};