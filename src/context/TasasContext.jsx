import React, { createContext, useState } from 'react';

export const TasasContext = createContext();

export const TasasProvider = ({ children }) => {
    const [tasas, setTasas] = useState({
        tasaXdia: "",
        tasaAldia: "",
        tasa7dias: "",
        tasa15dias: "",
        tasa30dias: ""
    });

    const contextValue = {
        tasas,
        setTasas,
    };
    return (
        <TasasContext.Provider value={contextValue}>
            {children}
        </TasasContext.Provider>
    );
};