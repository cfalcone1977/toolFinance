import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { DatosClienteContext } from '../../context/DatosClienteContext';
import traerInfoRechazos from './hooks/infoRechazos';
import "./detalleCheques.css"


function Detallecheques() {
  const {cuitCliente, setCuitCliente}=useContext(DatosClienteContext);
  const {listaChequesRechazados,setListaChequesRechazados}=useContext(DatosClienteContext);
  const {loadingRechazos, errorRechazos, dataRechazos} = traerInfoRechazos(cuitCliente);

  console.log(loadingRechazos);
  console.log(errorRechazos);

  

  useEffect(() => {
     if ((!loadingRechazos && dataRechazos && dataRechazos.results)){
         console.log("ya se cargo DATA Rechazos");
         console.log(dataRechazos.results.causales);
         
         let entidades=[];
         let chequesRechazados=[];
         console.log("estas son las entidades: ",entidades);
         for (let i = 0; i < dataRechazos.results.causales[0].entidades.length; i=i+1) {
             entidades.push(dataRechazos.results.causales[0].entidades[i]);
             for (let i2 = 0; i2 < dataRechazos.results.causales[0].entidades[i].detalle.length; i2=i2+1)
               {
                    console.log(dataRechazos.results.causales[0].entidades[i].detalle[i2].nroCheque);
                    console.log(dataRechazos.results.causales[0].entidades[i].detalle[i2].fechaRechazo);
                    console.log(dataRechazos.results.causales[0].entidades[i].detalle[i2].monto);
                    console.log(dataRechazos.results.causales[0].entidades[i].detalle[i2].fechaPago);
                   chequesRechazados.push(dataRechazos.results.causales[0].entidades[i].detalle[i2]);

             }
         }
         console.log(dataRechazos.results.causales[0]);
         console.log(dataRechazos.results.causales[1]);   
         console.log(entidades);
         setListaChequesRechazados(chequesRechazados);
         console.log(chequesRechazados);

     }

    }, [loadingRechazos,errorRechazos]);



  return (
    <section id='contenedorDatosRechazado'>
      <div id='encabezadoDatosRechazado'>Cheques RECHAZADOS</div>
      <article id='datosRechazados'>
        <div id='contenedorListaRechazados'>
          <p></p>
          <div>
              {listaChequesRechazados.map((c, index) => (
                 <p key={index}>{c.nroCheque} {`$ ${c.monto*1000}`} {c.fechaRechazo} {c.fechaPago}</p>
                ))}
          </div>
        </div>
        </article>
    </section>
  )
}

export default Detallecheques