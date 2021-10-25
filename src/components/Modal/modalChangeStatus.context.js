import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextChangeStatus = createContext({});

//Provider
const ModalProviderChangeStatus = ({children}) => {

    const [modalChangeStatusState, setState] = useState({ visible: false });

    const openModalChangeStatus = (payload) => setState({ ...payload, visible: true,});

    return <ModalContextChangeStatus.Provider value={{ modalChangeStatusState, openModalChangeStatus }}>
        {children}
    </ModalContextChangeStatus.Provider>
}

//Hook
const useModalContextChangeStatus = () => {
    const context = useContext(ModalContextChangeStatus);
    return context;
};

export { useModalContextChangeStatus, ModalProviderChangeStatus};