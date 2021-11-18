
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

        const now = new Date();
        const expiry = now.getTime() + 720000;

        try{
            const user = JSON.parse(storedUser);
            console.log(user.expiry)
            console.log(now.getTime());

            localStorage.setItem('user', JSON.stringify({
                user: user.user,
                expiry: expiry
            }));

            if(now.getTime() > user.expiry){
                localStorage.clear('user');
                return null;
            } else {
                return user;
            }
            
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