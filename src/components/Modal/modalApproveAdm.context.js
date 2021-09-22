import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextApproveAdm = createContext({});

//Provider
const ModalProviderApproveAdm = ({children}) => {

    const [modalApproveAdmState, setState] = useState({ visible: false });

    const openModalApproveAdm = (payload) => setState({ ...payload, visible: true,});

    return <ModalContextApproveAdm.Provider value={{ modalApproveAdmState, openModalApproveAdm }}>
        {children}
    </ModalContextApproveAdm.Provider>
}

//Hook
const useModalContextApproveAdm = () => {
    const context = useContext(ModalContextApproveAdm);
    return context;
};

export { useModalContextApproveAdm, ModalProviderApproveAdm};