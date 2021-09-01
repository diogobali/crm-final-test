import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContext4 = createContext({});

//Provider
const ModalProvider4 = ({ children }) => {

    const [modal4State, setState] = useState({ visible: false });

    const openModal4 = (payload) => setState({ ...payload, visible: true});

    return <ModalContext4.Provider value={{ modal4State, openModal4 }}>
        {children}
    </ModalContext4.Provider>
}

//Hook
const useModalContext4 = () => {
    const context = useContext(ModalContext4);
    return context;
};

export { useModalContext4, ModalProvider4};