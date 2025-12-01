import React, { createContext, useState } from 'react';

export const ActivaConsultaContext = createContext();

export const ActivaConsultaProvider = ({ children }) => {
  const [activaConsulta,setActivaConsulta]=useState(null);
  const contextValue = {
        activaConsulta, 
        setActivaConsulta
    };
    return (
        <ActivaConsultaContext.Provider value={contextValue}>
            {children}
        </ActivaConsultaContext.Provider>
    );
};