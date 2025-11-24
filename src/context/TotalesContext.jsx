import React, { createContext, useState } from 'react';

export const TotalesContext = createContext();

export const TotalesProvider = ({ children }) => {
    const total={importeTotal:"",tasaPromedio:"",profit:"",totalApagar:""};
    const [totales, setTotales] = useState(total);
    const contextValue = {
        totales,
        setTotales,
    };
    return (
        <TotalesContext.Provider value={contextValue}>
            {children}
        </TotalesContext.Provider>
    );
};