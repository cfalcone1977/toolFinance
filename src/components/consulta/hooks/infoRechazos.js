import { useEffect, useState } from 'react';

const BASE_URL = "https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/ChequesRechazados/";

export default function traerInfoRechazos(endpoint) {
    const [dataRechazos, setDataRechazos] = useState(null);   //useState([]);
    const [loadingRechazos, setLoadingRechazos] = useState(true);
    const [errorRechazos, setErrorRechazos] = useState(null);
    

    const getData = async (endpoint) => {
        try {
            setLoadingRechazos(true);
            setErrorRechazos(null);
            const res = await fetch(BASE_URL + endpoint);
            if (!res.ok) {
                   if (res.statusText==="Not Found") throw new Error("No se encontró datos para el C.U.I.T. ingresado.");
                   throw new Error("Error de Conexion, intente mas tarde");
                }

            const parsedData = await res.json();
            setDataRechazos(parsedData);
        } catch (error) {
            setErrorRechazos(error);
            setDataRechazos(null); //Limpiart Datos si hay error            
        } finally {
            setLoadingRechazos(false);
        }
    };
    useEffect(() => {
        if (!endpoint || endpoint.length < 11) {
            setDataRechazos(null);
            setErrorRechazos(null);
            setLoadingRechazos(false); // No está cargando porque no tiene que hacer nada
            return; // Detiene el useEffect aquí.
        }

        getData(endpoint);
    }, [endpoint]);
    return { dataRechazos, loadingRechazos, errorRechazos };
}
