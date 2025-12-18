import { useEffect, useState } from 'react';

const URL_ENTIDADES = "https://api.bcra.gob.ar/cheques/v1.0/entidades";

export default function traerEntidades(){
    const [data, setData] = useState([]);   //useState([]); //null*****
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); //null
    const getData = async () => {
        try {
            setLoading(true);
            setError(""); //null
            const res = await fetch(URL_ENTIDADES);
            if (!res.ok) {
                   if (res.statusText==="Not Found") throw new Error("Problema al Traer Entidades");
                   throw new Error("Error de Conexion, intente mas tarde");
                }

            const parsedData = await res.json();
            setData(parsedData);
        } catch (error) {
            setError(error);
            setData([]); //Limpiar Datos si hay error  **null**
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return { data, loading, error };
}