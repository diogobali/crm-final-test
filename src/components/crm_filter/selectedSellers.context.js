
import React, { createContext, useContext, useState } from 'react';

//Context
const SelectedSellersContext = createContext({});

//Provider
const SelectedSellersProvider = ({ children }) => {

    const [selectedSellers, setSelectedSellers] = useState([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    
    return (
    <SelectedSellersContext.Provider value={{ selectedSellers, setSelectedSellers, isFilterVisible, setIsFilterVisible }}>
        {children}
    </SelectedSellersContext.Provider>
    );
}

//Hook
const useSelectedSellers = () => {
    const context = useContext(SelectedSellersContext);
    return context;
};

export { useSelectedSellers, SelectedSellersProvider};