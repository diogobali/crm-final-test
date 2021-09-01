import React, { createContext, useState } from 'react';

export const SaveFormContext = createContext();

export const SaveFormProvider = ({ children }) => {

    const [selectedType, setSelectedType] = useState(null);

    const [totalAge, setTotalAge] = useState(null);
    const [firstAge, setFirstAge] = useState(0);
    const [secondAge, setSecondAge] = useState(0);
    const [thirdAge, setThirdAge] = useState(0);
    const [fourthAge, setFourthAge] = useState(0);
    const [fifthAge, setFifthAge] = useState(0);
    const [sixthAge, setSixthAge] = useState(0);
    const [seventhAge, setSeventhAge] = useState(0);
    const [eighthAge, setEighthAge] = useState(0);
    const [ninethAge, setNinethAge] = useState(0);
    const [tenthAge, setTenthAge] = useState(0);

    const [zone, setZone] = useState(null);
    const [hospitals, setHospitals] = useState(null);
    const [labs, setLabs] = useState(null);
    const [illness, setIllness] = useState(null);


    const saveSelectedType = tAge => {
        setSelectedType(tAge);
    }

    const saveTotalAge = (tAge) =>{
        setTotalAge(tAge);
    } 
    const saveFirstAge = (tAge) =>{
        setFirstAge(tAge);
    }
    const saveSecondAge = tAge => {
        setSecondAge(tAge);
    }
    const saveThirdAge = tAge => {
        setThirdAge(tAge);
    }
    const saveFourthAge = tAge => {
        setFourthAge(tAge);
    }
    const saveFifthAge = tAge => {
        setFifthAge(tAge);
    }
    const saveSixthAge = tAge => {
        setSixthAge(tAge);
    }
    const saveSeventhAge = tAge => {
        setSeventhAge(tAge);
    }
    const saveEighthAge = tAge => {
        setEighthAge(tAge);
    }
    const saveNinethAge = tAge => {
        setNinethAge(tAge);
    }
    const saveTenthAge = tAge => {
        setTenthAge(tAge);
    }
    const saveZone = tAge => {
        setZone(tAge);
    }
    const saveHospitals = tAge => {
        setHospitals(tAge);
    }
    const saveLabs = tAge => {
        setLabs(tAge);
    }
    const saveIllness = tAge => {
        setIllness(tAge);
    }

    return(
        <SaveFormContext.Provider value={{
                                    selectedType, saveSelectedType,
                                    totalAge, saveTotalAge,
                                    firstAge, saveFirstAge,
                                    secondAge, saveSecondAge,
                                    thirdAge, saveThirdAge,
                                    fourthAge, saveFourthAge,
                                    fifthAge, saveFifthAge,
                                    sixthAge, saveSixthAge,
                                    seventhAge, saveSeventhAge,
                                    eighthAge, saveEighthAge,
                                    ninethAge, saveNinethAge,
                                    tenthAge, saveTenthAge,
                                    zone, saveZone,
                                    hospitals, saveHospitals,
                                    labs, saveLabs,
                                    illness, saveIllness,
                                }}>
            { children }
        </SaveFormContext.Provider>
    )

}

export default SaveFormProvider;
