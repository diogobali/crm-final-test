import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextReproveAdm = createContext({});

//Provider
const ModalProviderReproveAdm = ({children}) => {

    const [modalReproveAdmState, setState] = useState({ visible: false });

    const openModalReproveAdm = (payload) => setState({ ...payload, visible: true,});

    return <ModalContextReproveAdm.Provider value={{ modalReproveAdmState, openModalReproveAdm }}>
        {children}
    </ModalContextReproveAdm.Provider>
}

//Hook
const useModalContextReproveAdm = () => {
    const context = useContext(ModalContextReproveAdm);
    return context;
};

export { useModalContextReproveAdm, ModalProviderReproveAdm};