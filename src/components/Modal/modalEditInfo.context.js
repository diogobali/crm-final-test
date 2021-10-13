import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextEditInfo = createContext({});

//Provider
const ModalProviderEditInfo = ({ children }) => {

    const [modalEditInfoState, setState] = useState({ visible: false });

    const openModalEditInfo = (payload) => setState({ ...payload, visible: true});

    return <ModalContextEditInfo.Provider value={{ modalEditInfoState, openModalEditInfo }}>
        {children}
    </ModalContextEditInfo.Provider>
}

//Hook
const useModalContextEditInfo = () => {
    const context = useContext(ModalContextEditInfo);
    return context;
};

export { useModalContextEditInfo, ModalProviderEditInfo};