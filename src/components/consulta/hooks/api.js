export async function consultaCUIT(numero_cuit) {
    const urlConsultaCuit="https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/";
    try {
        const response = await fetch(urlConsultaCuit+numero_cuit.value);
        const data = await response.json();
        //console.log(data.status);
        if (data.status>=400){
                                         throw new Error(data.errorMessages[0]);
                             }
        return data;// un objeto data con diferentes propiedades, otros objetos y arreglos.
    } catch (error) {
        mostrarError(error.message,panel);
        //console.error("Error al acceder a CUIT:",error.message);
        return null;//si da error se devuelve null
    }
}