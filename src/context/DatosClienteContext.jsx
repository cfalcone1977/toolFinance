import React, { createContext, useState } from 'react';

export const DatosClienteContext = createContext();

export const DatosClienteProvider = ({ children }) => {
    const [cuitCliente, setCuitCliente] = useState(null);
    const [denominacionCliente, setDenominacionCliente]=useState("");
    const [periodosCliente, setPeriodosCliente]=useState([]);
    const [entidades, setEntidades]=useState([]);
    const [datosCargados,setDatosCargados]=useState(false);
    const [errorConsulta, setErrorConsulta]=useState("");

    const contextValue = {
        cuitCliente, setCuitCliente,
        denominacionCliente, setDenominacionCliente,
        periodosCliente, setPeriodosCliente,
        entidades, setEntidades,
        datosCargados, setDatosCargados,
        errorConsulta, setErrorConsulta
    };
    return (
        <DatosClienteContext.Provider value={contextValue}>
            {children}
        </DatosClienteContext.Provider>
    );
};