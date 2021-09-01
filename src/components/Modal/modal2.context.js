import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContext2 = createContext({});

//Provider
const ModalProvider2 = ({ children }) => {

    const [modal2State, setState] = useState({ visible: false });
    
    const openModal2 = (payload) => setState({ ...payload, visible: true});

    return <ModalContext2.Provider value={{ modal2State, openModal2 }}>
        {children}
    </ModalContext2.Provider>
}

//Hook
const useModalContext2 = () => {
    const context = useContext(ModalContext2);
    return context;
};

export { useModalContext2, ModalProvider2};