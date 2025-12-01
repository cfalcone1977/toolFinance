import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { DatosClienteContext } from '../../context/DatosClienteContext';
import traerInfoCuit from "./hooks/infoCuit";
import "./datosCliente.css";


function Datoscliente() {
  const {cuitCliente, setCuitCliente}=useContext(DatosClienteContext);
  const {denominacionCliente, setDenominacionCliente}=useContext(DatosClienteContext);
  const {periodosCliente, setPeriodosCliente}=useContext(DatosClienteContext);
  const {entidades, setEntidades}=useContext(DatosClienteContext);
  const {datosCargados, setDatosCargados}=useContext(DatosClienteContext);
  const {errorConsulta, setErrorConsulta}=useContext(DatosClienteContext);

  const { loading, error, data } = traerInfoCuit(cuitCliente);    
  console.log(loading);
  console.log(error);

  useEffect(() => {
     if ((!loading && data && data.results)){
         console.log("ya se cargo DATA");
         console.log(data);
         console.log(error);
         console.log(data.results.denominacion);
         console.log(data.results.periodos[0].entidades);         
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



//{cuitCliente?<MuestraDatosCuit  cuit={cuitCliente}/>:"NO HAY CUIT AUN"}


/*
import React from 'react'
import { useContext, useEffect, useState } from 'react';
//import { ActivaConsultaContext } from '../../context/ActivaConsultaContext';
import { DatosClienteContext } from '../../context/DatosClienteContext';
import traerInfoCuit from "./hooks/infoCuit";
import MuestraDatosCuit from './MuestraDatosCuit';
import "./datosCliente.css";


function Datoscliente() {
  //const {activaConsulta, setActivaConsulta}= useContext(ActivaConsultaContext);;
  const {cuitCliente, setCuitCliente}=useContext(DatosClienteContext);



  return (
    <section id='contenedorDatosCliente'>
      <div id='encabezadoDatosCliente'>Datos CLIENTE</div>
      <article id='datosCliente'>
        <div>{cuitCliente?<MuestraDatosCuit  cuit={cuitCliente}/>:"NO HAY CUIT AUN"}</div>
        </article>
    </section>
  )
}

export default Datoscliente

*/

















/*
import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { ActivaConsultaContext } from '../../context/ActivaConsultaContext';
import traerInfoCuit from "./hooks/infoCuit";
import MuestraDatosCuit from './MuestraDatosCuit';
import "./datosCliente.css";


function Datoscliente() {
  const {activaConsulta, setActivaConsulta}= useContext(ActivaConsultaContext);
  

  return (
    <section id='contenedorDatosCliente'>
      <div id='encabezadoDatosCliente'>Datos CLIENTE</div>
      <article id='datosCliente'>
        <div>{activaConsulta?<MuestraDatosCuit  cuit={activaConsulta}/>:"NO HAY CUIT AUN"}</div>
        </article>
    </section>
  )
}

export default Datoscliente


*/
