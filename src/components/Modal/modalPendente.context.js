import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextPendente = createContext({});

//Provider
const ModalProviderPendente = ({children}) => {

    const [modalPendenteState, setState] = useState({ visible: false });

    const openModalPendente = (payload) => setState({ ...payload, visible: true,});

    return <ModalContextPendente.Provider value={{ modalPendenteState, openModalPendente }}>
        {children}
    </ModalContextPendente.Provider>
}

//Hook
const useModalContextPendente = () => {
    const context = useContext(ModalContextPendente);
    return context;
};

export { useModalContextPendente, ModalProviderPendente};