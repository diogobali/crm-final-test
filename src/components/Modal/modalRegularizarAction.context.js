import React, { createContext, useContext, useState } from 'react';

//Context
const ModalContextRegularizarAction = createContext({});

//Provider
const ModalProviderRegularizarAction = ({children}) => {

    const [modalRegularizarActionState, setState] = useState({ visible: false });

    const openModalRegularizarAction = (payload) => setState({ ...payload, visible: true,});

    return <ModalContextRegularizarAction.Provider value={{ modalRegularizarActionState, openModalRegularizarAction }}>
        {children}
    </ModalContextRegularizarAction.Provider>
}

//Hook
const useModalContextRegularizarAction = () => {
    const context = useContext(ModalContextRegularizarAction);
    return context;
};

export { useModalContextRegularizarAction, ModalProviderRegularizarAction};