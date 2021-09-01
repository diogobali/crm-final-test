import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextSendAdm = createContext({});

//Provider
const ModalProviderSendAdm = ({children}) => {

    const [modalSendAdmState, setState] = useState({ visible: false });

    const openModalSendAdm = (payload) => setState({ ...payload, visible: true,});

    return <ModalContextSendAdm.Provider value={{ modalSendAdmState, openModalSendAdm }}>
        {children}
    </ModalContextSendAdm.Provider>
}

//Hook
const useModalContextSendAdm = () => {
    const context = useContext(ModalContextSendAdm);
    return context;
};

export { useModalContextSendAdm, ModalProviderSendAdm};