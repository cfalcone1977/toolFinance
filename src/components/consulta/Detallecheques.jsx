import { useContext, useEffect, useState } from 'react';
import { DatosClienteContext } from '../../context/DatosClienteContext';
import traerInfoRechazos from './hooks/infoRechazos';
import { formatoMoneda, formatearFecha } from '../utils/calculos';
import "./detalleCheques.css"


function Detallecheques() {
  const {cuitCliente, setCuitCliente}=useContext(DatosClienteContext);
  const {listaChequesRechazados,setListaChequesRechazados}=useContext(DatosClienteContext);
  const {denominacionCliente, setDenominacionCliente}=useContext(DatosClienteContext);
  const {loadingRechazos, errorRechazos, dataRechazos} = traerInfoRechazos(cuitCliente);
  const {situacionCheques, setSituacionCheques}=useContext(DatosClienteContext);
  const {periodosCliente, setPeriodosCliente}=useContext(DatosClienteContext);

  

  useEffect(() => {
    if (cuitCliente === "" || denominacionCliente === "CUIT Inexistente") {
        setSituacionCheques(0);
        setListaChequesRechazados([]); 
        return; 
    }
     if ((!loadingRechazos && dataRechazos && dataRechazos.results)){
         let entidades=[];
         let chequesRechazados=[];
         for (let i = 0; i < dataRechazos.results.causales[0].entidades.length; i=i+1) {
             entidades.push(dataRechazos.results.causales[0].entidades[i]);
             for (let i2 = 0; i2 < dataRechazos.results.causales[0].entidades[i].detalle.length; i2=i2+1)
               {
                   chequesRechazados.push(dataRechazos.results.causales[0].entidades[i].detalle[i2]);
             }
         }       
         if (chequesRechazados.length>0){
                                setSituacionCheques(3);
                          
                                   } 
           
         setListaChequesRechazados(chequesRechazados);
     }

    console.log(dataRechazos);
    console.log(denominacionCliente);   
    if (dataRechazos.length===0 && (denominacionCliente!="CUIT Inexistente" && denominacionCliente!="")){  //null
                         setSituacionCheques(1);
                            }                     

    if (cuitCliente==="" || denominacionCliente==="CUIT Inexistente"){
                        setSituacionCheques(0);
                         }
    }, [loadingRechazos,errorRechazos,dataRechazos,cuitCliente,denominacionCliente]);///se agrego situacionCheques

const colorSituacionCheques=(situacion)=>{
    if (situacion === 0) {
      return { backgroundColor: 'beige' };  
    }
    if (situacion === 1) {
      return { backgroundColor: 'green' };
    } else if (situacion === 2) {
      return { backgroundColor: 'yellow' };
    } else if (situacion >= 3 && situacion <= 5) {
      return { backgroundColor: 'red' };
    }
    return ''; 
}


  return (
    <section id='contenedorDatosRechazado' style={colorSituacionCheques(situacionCheques)}>
      <div id='encabezadoDatosRechazado'>{console.log(situacionCheques)}{situacionCheques===1?"NO EXISTEN Cheques RECHAZADOS":"Cheques Rechazados"}</div>
      <article id='datosRechazados'>
          <div id='contenedorEncabezados'>
              <div className='contNumeroCheque'>{(listaChequesRechazados.length>0)?"Nro Cheque":""}</div>
              <div className='contMonto'>{(listaChequesRechazados.length>0)?"Importe":""}</div>
              <div className='contFechaRechazo'>{(listaChequesRechazados.length>0)?"F. Rechazo":""}</div>
              <div className='contFechaPago'>{(listaChequesRechazados.length>0)?"F. Pago":""}</div>
          </div>
          <div>
              {listaChequesRechazados.map((c, index) => (
                <div key={index} id='contenedorListaRechazados'>
                  <div id='contNumeroCheque'>{c.nroCheque}</div>
                  <div id='contMonto'>{formatoMoneda(c.monto)}</div>
                  <div id='contFechaRechazo'>{formatearFecha(c.fechaRechazo)}</div>
                  <div id='contFechaPago'>{c.fechaPago?formatearFecha(c.fechaPago):"Debe"}</div>  
                </div>
                ))}
         </div>
         <div id='contenedorResultadosRechazados'>
           <p></p>
         </div>
        </article>
    </section>
  )
}

export default Detallecheques