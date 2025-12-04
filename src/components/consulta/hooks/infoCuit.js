import { useEffect, useState } from 'react';

const BASE_URL = "https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/";

export default function traerInfoCuit(endpoint) {
    console.log(endpoint);
    const [data, setData] = useState(null);   //useState([]); //null*****
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getData = async (endpoint) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(BASE_URL + endpoint);
            if (!res.ok) {
                   if (res.statusText==="Not Found") throw new Error("CUIT Inexistente");
                   throw new Error("Error de Conexion, intente mas tarde");
                }

            const parsedData = await res.json();
            setData(parsedData);
        } catch (error) {
            setError(error);
            setData(null); //Limpiar Datos si hay error            
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!endpoint || endpoint.length < 11) {
            setData(null);
            setError(null);
            setLoading(false); // No está cargando porque no tiene que hacer nada
            return; // Detiene el useEffect aquí.
        }

        getData(endpoint);
    }, [endpoint]);
    return { data, loading, error };
}
