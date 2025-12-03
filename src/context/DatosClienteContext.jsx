import React, { createContext, useState } from 'react';

export const DatosClienteContext = createContext();

export const DatosClienteProvider = ({ children }) => {
    const [cuitCliente, setCuitCliente] = useState("");
    const [denominacionCliente, setDenominacionCliente]=useState("");
    const [periodosCliente, setPeriodosCliente]=useState([]);
    const [entidades, setEntidades]=useState([]);
    const [listaChequesRechazados,setListaChequesRechazados]=useState([]);
    const [situacionBancos, setSituacionBancos]=useState(0);
    const [situacionCheques, setSituacionCheques]=useState(0);
    const [datosCargados,setDatosCargados]=useState(false);
    const [errorConsulta, setErrorConsulta]=useState("");

    const contextValue = {
        cuitCliente, setCuitCliente,
        denominacionCliente, setDenominacionCliente,
        periodosCliente, setPeriodosCliente,
        entidades, setEntidades,
        listaChequesRechazados, setListaChequesRechazados,
        situacionBancos, setSituacionBancos,
        situacionCheques, setSituacionCheques,
        datosCargados, setDatosCargados,
        errorConsulta, setErrorConsulta
    };
    return (
        <DatosClienteContext.Provider value={contextValue}>
            {children}
        </DatosClienteContext.Provider>
    );
};