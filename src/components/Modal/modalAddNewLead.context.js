import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextAddNewLead = createContext({});

//Provider
const ModalProviderAddNewLead = ({children}) => {

    const [modalAddNewLeadState, setState] = useState({ visible: false });

    const openModalAddNewLead = (payload) => setState({ ...payload, visible: true,});

    return <ModalContextAddNewLead.Provider value={{ modalAddNewLeadState, openModalAddNewLead }}>
        {children}
    </ModalContextAddNewLead.Provider>
}

//Hook
const useModalContextAddNewLead = () => {
    const context = useContext(ModalContextAddNewLead);
    return context;
};

export { useModalContextAddNewLead, ModalProviderAddNewLead};