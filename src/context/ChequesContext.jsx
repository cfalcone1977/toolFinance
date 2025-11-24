import React, { createContext, useState } from 'react';

export const ChequesContext = createContext();

export const ChequesProvider = ({ children }) => {
  const cheque={importe:"", fecha:""};
  const [cheques,setCheques]= useState(Array(10).fill(cheque));
  const contextValue = {
        cheques,
        setCheques,
    };
    return (
        <ChequesContext.Provider value={contextValue}>
            {children}
        </ChequesContext.Provider>
    );
};