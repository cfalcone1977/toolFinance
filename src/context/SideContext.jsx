import React, { createContext, useState } from 'react';

export const SideContext = createContext();

export const ResultadosProvider = ({ children }) => {
    const resultado={diasCobro:"",porcentaje:"",descuento:"",liquidar:""};
    const [calculos, setCalculos] = useState(Array(10).fill(resultado));
    const contextValue = {
        calculos,
        setCalculos,
    };
    return (
        <SideContext.Provider value={contextValue}>
            {children}
        </SideContext.Provider>
    );
};