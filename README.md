# 🏦 Herramienta de Calculo Financiero y Consulta CUIT.

Este proyecto es una aplicación web interactiva desarrollada con **React** que permite: realizar calculos sobre descuento de cheques por fecha, adminitiendo la posibilidad de ingresar hasta 10 cheques al mismo tiempo; y consultar la **situación crediticia** y el historial de **cheques rechazados** de un CUIT/CUIL, utilizando las APIs públicas del Banco Central de la República Argentina (BCRA).

La herramienta proporciona una visualización clara del nivel de riesgo bancario mediante un sistema de semaforo:
Mostrando color verde 🟩 para una situacion normal, 🟨 para una situacion anómala y 🟥 para una situacion compleja desde el punto de vista crediticio.


 A continuación, se detalla la estructura y el propósito de las variables y funciones principales en los archivos clave del proyecto.

 1. context/DatosClienteContext.jsx 
 Define el almacén de estado global, centralizando todos los datos del cliente y resultados de las consultas.JavaScriptimport React, { createContext, useState } from 'react';

// Crea y exporta el objeto Contexto.
export const DatosClienteContext = createContext();

export const DatosClienteProvider = ({ children }) => {
    // 📇 Estado del Cliente y Consulta
    const [cuitCliente, setCuitCliente] = useState("");         // CUIT ingresado (motor de las consultas API).
    const [denominacionCliente, setDenominacionCliente] = useState(""); // Nombre/razón social obtenida de la API.
    const [datosCargados, setDatosCargados] = useState(false);  // Indica si la consulta principal finalizó con éxito.
    const [errorConsulta, setErrorConsulta] = useState("");     // Mensaje de error (ej: "CUIT Inexistente").

    // 🏦 Estado de Deudas (BCRA)
    const [periodosCliente, setPeriodosCliente] = useState([]); // Historial de periodos de deuda.
    const [entidades, setEntidades] = useState([]);             // Detalle de deuda por entidad financiera.
    const [situacionBancos, setSituacionBancos] = useState(0);  // Nivel de riesgo bancario.

    // 💰 Estado de Cheques Rechazados
    const [listaChequesRechazados, setListaChequesRechazados] = useState([]); // Lista detallada de cheques rechazados.
    const [situacionCheques, setSituacionCheques] = useState(0); // Nivel de riesgo por cheques (0:Inicial/Limpieza, 1:Verde, 3:Rojo).

    // ... (El objeto contextValue contiene todas las variables y sus setters)
};


2. Datoscuit.jsx 
Componente de interfaz para la entrada del CUIT, validación y control de limpieza.
Valida que la entrada sea numérica y que la longitud no exceda los 11 dígitos, controlando el estado local del input. manejoConsulta(e)Se ejecuta al enviar el formulario. Transfiere el CUIT válido al estado global (setCuitCliente), disparando las consultas API a través de los Hooks.
datosLimpiar()Función Crítica de Limpieza. Se ejecuta en el evento onFocus del input CUIT. Limpia todos los estados globales y locales para asegurar que la interfaz esté limpia y lista para una nueva búsqueda.

3. Datoscliente.jsxComponente que consume los datos de la API principal (traerInfoCuit) y los muestra en la interfaz.JavaScript// ...
const { loading, error, data } = traerInfoCuit(cuitCliente); 
useEffect(() => {
    // 1. Caso de Éxito: Carga de datos de denominación, periodos y entidades al Contexto.
    if ((!loading && data && data.results)){      
        setDenominacionCliente(data.results.denominacion);
        setPeriodosCliente(data.results.periodos);
        setEntidades(data.results.periodos[0].entidades);
        setDatosCargados(true);
    }
    // 2. Caso de Error: Propaga el mensaje de error del Hook a la interfaz.
    if (error!=null){
        setDenominacionCliente(error.message); 
        setErrorConsulta(error.message);       
        setPeriodosCliente([]);
        setEntidades([]);
    }

}, [loading, error, data]); // Dependencias: Se re-ejecuta al cambiar el estado de la consulta.
// ...

4. Detallecheques.jsxComponente que procesa y muestra los cheques rechazados, gestionando el nivel de riesgo visual.JavaScript// ...
const {loadingRechazos, errorRechazos, dataRechazos} = traerInfoRechazos(cuitCliente);

useEffect(() => {
    // 0. Condición de Limpieza/Error: Asegura Situación 0 (Beige) y vacía la lista.
    if (cuitCliente === "" || denominacionCliente === "CUIT Inexistente") {
        setSituacionCheques(0);
        setListaChequesRechazados([]); 
        return; 
    }

    // 3. Caso de Rechazos (Situación 3 - Rojo): Si la API devuelve cheques.
    if ((!loadingRechazos && dataRechazos && dataRechazos.results)){
        // ... Lógica de iteración y extracción de chequesRechazados ...
        
        if (chequesRechazados.length > 0) {
            setSituacionCheques(3); // Estado de riesgo
        } 
        setListaChequesRechazados(chequesRechazados);
    }

    // 1. Caso de No Rechazos (Situación 1 - Verde): CUIT válido, pero la API de rechazos devuelve null.
    if (dataRechazos === null && (denominacionCliente !== "CUIT Inexistente" && denominacionCliente !== "")){
        setSituacionCheques(1); // Estado 'Limpio'
        setListaChequesRechazados([]);
    }

}, [loadingRechazos, errorRechazos, dataRechazos, cuitCliente, denominacionCliente]); 
// ... (Función colorSituacionCheques: aplica color basado en el valor de situacionCheques)


5. Custom Hooks: infoCuit.js y infoRechazos.js Hooks que abstraen la lógica de consulta y gestión de estado de las APIs externas. Característica Detalle useEffect Condicional El fetch solo se ejecuta si el endpoint (CUIT) tiene una longitud de 11 dígitos. Esto previene llamadas innecesarias. Manejo de Errores Gestiona los estados de loading, data y error. Los errores HTTP (ej: 404) se capturan y se convierten en mensajes específicos ("CUIT Inexistente"). Retorno Devuelve un objeto ({ data, loading, error }) para el consumo directo en los componentes.

6. utils/calculos.js 
Contiene funciones de lógica financiera, persistencia y formato de datos.
calculo_tasa, realizar Calculos Totales Lógica Financiera Lógica de cálculo compleja de tasas de descuento, totales de importe, y promedio de tasas basado en el día de cobro. 
formatoMoneda, formatearFechaFormato Normalización de salida de números (moneda ARS) y fechas (DD/MM/YYYY).
guardar/recuperar...Persistencia, Utiliza localStorage para guardar la configuración de tasas y listas de cheques entre sesiones del navegador.




🚀 Instalación y Ejecución Local (Vite)
Esta sección describe cómo obtener una copia del proyecto y ejecutarlo en tu máquina local para desarrollo. El proyecto utiliza Vite para un desarrollo rápido y React Router DOM para la navegación.

Prerrequisitos
Necesitas tener instalado lo siguiente en tu sistema:

Node.js (versión LTS recomendada).

npm (Node Package Manager).

Pasos para la Ejecución
Sigue estos pasos en tu terminal:

Clonar el Repositorio: Descarga el código fuente.

Bash

git clone https://github.com/cfalcone1977/toolFinance
cd toolfinance


Instalar Dependencias: Instala todas las librerías necesarias (incluyendo React Router DOM).

Bash
# Instalación de dependencias del proyecto
npm install

# Si necesitas agregar React Router DOM por separado:
npm install react-router-dom

npm install
Iniciar el Servidor de Desarrollo: Usa el script dev (definido en tu package.json) para iniciar el servidor de desarrollo de Vite.

Bash

npm run dev

Una vez ejecutado el comando, el servidor se iniciará y la aplicación estará disponible en tu navegador web, generalmente en http://localhost:5173.

