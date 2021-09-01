
import React, { createContext, useContext, useState } from 'react';

//Context
const UserContext = createContext({});

//Provider
const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState(function () {
        const storedUser = localStorage.getItem('user');

        if(!storedUser){
            return null;
        }

        try{
            const user = JSON.parse(storedUser);
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    });

    
    return <UserContext.Provider value={{ userData, setUserData }}>
        {children}
    </UserContext.Provider>     
}

//Hook
const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
};

export { useUserContext, UserProvider };