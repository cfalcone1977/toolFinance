import { useContext, useEffect, useState } from 'react';
import { DatosClienteContext } from '../../context/DatosClienteContext';
import traerInfoCuit from "./hooks/infoCuit";
import traerInfoRechazos from './hooks/infoRechazos';
import "./datosCliente.css";


function Datoscliente() {
  const {cuitCliente, setCuitCliente}=useContext(DatosClienteContext);
  const {denominacionCliente, setDenominacionCliente}=useContext(DatosClienteContext);
  const {periodosCliente, setPeriodosCliente}=useContext(DatosClienteContext);
  const {entidades, setEntidades}=useContext(DatosClienteContext);
  const {datosCargados, setDatosCargados}=useContext(DatosClienteContext);
  const {errorConsulta, setErrorConsulta}=useContext(DatosClienteContext);

  const { loading, error, data } = traerInfoCuit(cuitCliente);    




  useEffect(() => {
     if ((!loading && data && data.results)){      
         setDenominacionCliente(data.results.denominacion);
         setPeriodosCliente(data.results.periodos);
         setEntidades(data.results.periodos[0].entidades);
         const cargados=true;
         setDatosCargados(cargados);
     }
     if (error!=null){
                   setDenominacionCliente(error.message);
                   setErrorConsulta(error.message);
                   setPeriodosCliente([]);
                   setEntidades([]);
                     }

    }, [loading,error]);



  return (
    <section id='contenedorDatosCliente'>
      <div id='encabezadoDatosCliente'>Datos CLIENTE</div>
      <article id='datosCliente'>
        <div id='contenedorClientePeriodo'>
          <p>{denominacionCliente}</p>
          <div>{periodosCliente.map((p, index) => (
                 <p key={index}>Periodo: {p.periodo}</p>
                ))}
          </div>
        </div>
        </article>
    </section>
  )
}

export default Datoscliente
