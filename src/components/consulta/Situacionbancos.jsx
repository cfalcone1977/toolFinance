import React from 'react'
import { useContext, useEffect } from 'react';
import "./situacionBancos.css";
import { DatosClienteContext } from '../../context/DatosClienteContext';

function Situacionbancos() {
  const {periodosCliente, setPeriodosCliente}=useContext(DatosClienteContext);
  const {entidades, setEntidades}=useContext(DatosClienteContext);
  const {datosCargados,setDatosCargados}=useContext(DatosClienteContext);

  /*
    console.log(periodosCliente.length);
    if (periodosCliente.length>0){
      console.log(periodosCliente[0].entidades.length);
      for (let i = 0; i < periodosCliente[0].entidades.length; i=i+1) {
        console.log(periodosCliente[0].entidades[i].entidad);
        console.log(periodosCliente[0].entidades[i].monto);
        console.log(periodosCliente[0].entidades[i].situacion);
      }

    }
*/
  console.log(periodosCliente);
  useEffect(() => {
     if (datosCargados){
         console.log(periodosCliente);
         /*
         for (let i = 0; i < periodosCliente[0].entidades.length; i=i+1) {
           console.log(periodosCliente[0].entidades[i].entidad);
           console.log(periodosCliente[0].entidades[i].monto);
           console.log(periodosCliente[0].entidades[i].situacion);
         }
*/
     }
    }, [datosCargados]);





  return (
    <section id='contenedorSituacionBancos'>
      <div id='encabezadoSituacionBancos'>Situacion BANCOS</div>
      <article id='datosBancos'>
          <div>
                <div>{entidades.map((e, index) => (
                 <p key={index}>{e.entidad} {`$ ${e.monto*1000}`} {e.situacion}</p>
                ))}
                </div>
          </div>        
      </article>
    </section>    
  )
}

export default Situacionbancos