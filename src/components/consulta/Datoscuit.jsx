import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
//import { ActivaConsultaContext } from '../../context/ActivaConsultaContext';
import { DatosClienteContext } from '../../context/DatosClienteContext';


import "./datosCuit.css"

function Datoscuit() {
  //const {activaConsulta, setActivaConsulta}= useContext(ActivaConsultaContext);
  const {cuitCliente, setCuitCliente} = useContext(DatosClienteContext);
  const {errorConsulta, setErrorConsulta}=useContext(DatosClienteContext);
  const {datosCargados, setDatosCargados}=useContext(DatosClienteContext);
  const {denominacionCliente, setDenominacionCliente}=useContext(DatosClienteContext);
  const {periodosCliente, setPeriodosCliente}=useContext(DatosClienteContext);
  const {entidades, setEntidades}=useContext(DatosClienteContext);
  const {listaChequesRechazados, setListaChequesRechazados}=useContext(DatosClienteContext);
  const {situacionBancos,setSituacionBancos}=useContext(DatosClienteContext);
  const {situacionCheques, setSituacionCheques}=useContext(DatosClienteContext);
  const [cuit, setCuit] = useState("");
  const [deshabilitarConsulta, setDeshabilitarConsulta]=useState(true);


  const controlarCUIT=(e)=>{
    const {value}=e.target;
    const validador=/^\d*$/;
    if ((value!="" && !validador.test(value)) || (value.length>11))  {
    return;
    }
    const BKcuit=value;
    console.log(BKcuit);
    setCuit(BKcuit);
    setErrorConsulta("");
    setDatosCargados(false);
    if (BKcuit.length===11){
      console.log("ENTRO");
      setDeshabilitarConsulta(!(BKcuit.length===11));
    } else setDeshabilitarConsulta(!(BKcuit.length===11));
  }

  const manejoConsulta=(e)=>{
    e.preventDefault();
    //const activar=cuit;     /// a reemplazar por variable que cambia estado de cuitCliente
    
    //setActivaConsulta(activar); /// a reemplazar por cuitCliente
    setCuitCliente(cuit); /// esto reemplaza las lineas 35 y 37 
    setDeshabilitarConsulta(true);
    //console.log(activaConsulta);
    console.log(cuitCliente);
  }

 const datosLimpiar=()=>{
   setCuit("");
   setDenominacionCliente("");
   setPeriodosCliente([]);
   setEntidades([]);
   setSituacionBancos(0);
   setSituacionCheques(0);
   setListaChequesRechazados([]);
   setDeshabilitarConsulta(true);
   setErrorConsulta("");
 }

 
 

  
  return (
    <form id='contenedorFormularioDatosCUIT' onSubmit={manejoConsulta}>
      <section id="encabezadoDatosCuit">
        <div id='textoEncabezado'>Datos a CHEQUEAR</div>
      </section>  
      <section id='contenedorCUIT'> 
        <label htmlFor="CUIT">C.U.I.T.:</label>
        <input id='CUIT' className='inputCUIT' type="text" name='CUIT' value={cuit} placeholder='20261346959' onClick={()=>datosLimpiar()} onChange={(e)=>controlarCUIT(e)}/>
      </section>    
      <section id='contenedorErroresTasas'>
         <div id='erroresCuit'>{errorConsulta}</div>
      </section>
      <button type='submit' disabled={deshabilitarConsulta} id='botonConsultarCuit'>Consulta</button>
    </form>
  )
}

export default Datoscuit



/*
import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { ActivaConsultaContext } from '../../context/ActivaConsultaContext';

import "./datosCuit.css"

function Datoscuit() {
  const {activaConsulta, setActivaConsulta}= useContext(ActivaConsultaContext);
  const [cuit, setCuit] = useState("");
  const [error, setError]=useState("");
  const [deshabilitarConsulta, setDeshabilitarConsulta]=useState(true);


  const controlarCUIT=(e)=>{
    const {value}=e.target;
    const validador=/^\d*$/;
    if ((value!="" && !validador.test(value)) || (value.length>11))  {
    return;
    }

    const BKcuit=value;
    console.log(BKcuit);
    setCuit(BKcuit);
    if (BKcuit.length===11){
      console.log("ENTRO");
      setDeshabilitarConsulta(!(BKcuit.length===11));
    } else setDeshabilitarConsulta(!(BKcuit.length===11));
  }

  const manejoConsulta=(e)=>{
    e.preventDefault();
    const activar=cuit;
    setActivaConsulta(activar);
    console.log(activaConsulta);
  
  }


  
  return (
    <form id='contenedorFormularioDatosCUIT' onSubmit={manejoConsulta}>
      <section id="encabezadoDatosCuit">
        <div id='textoEncabezado'>Datos a CHEQUEAR</div>
      </section>  
      <section id='contenedorCUIT'> 
        <label htmlFor="CUIT">C.U.I.T.:</label>
        <input id='CUIT' className='inputCUIT' type="text" name='CUIT' value={cuit} placeholder='20261346959' onChange={(e)=>controlarCUIT(e)}/>
      </section>    
      <section id='contenedorErroresTasas'>
         <div id='erroresTasa'>{error}</div>
      </section>
      <button type='submit' disabled={deshabilitarConsulta} id='botonConsultarCuit'>CONSULTA</button>
    </form>
  )
}

export default Datoscuit
*/
