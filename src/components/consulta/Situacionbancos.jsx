import React from 'react'
import { useContext, useEffect } from 'react';
import "./situacionBancos.css";
import { DatosClienteContext } from '../../context/DatosClienteContext';
import { formatoMoneda } from '../utils/calculos';

function Situacionbancos() {
  const {periodosCliente, setPeriodosCliente}=useContext(DatosClienteContext);
  const {entidades, setEntidades}=useContext(DatosClienteContext);
  const {datosCargados,setDatosCargados}=useContext(DatosClienteContext);
  const {situacionBancos, setSituacionBancos}=useContext(DatosClienteContext);

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
  let peorSituacion=1;
  useEffect(() => {
     if (datosCargados){
         console.log(periodosCliente);
         for (let i = 0; i < entidades.length; i=i+1) {
            if  (peorSituacion<entidades[i].situacion){
                                                 peorSituacion=entidades[i].situacion;
                                                      }
         }
         console.log(peorSituacion);
         setSituacionBancos(peorSituacion);
         
         /*
         for (let i = 0; i < periodosCliente[0].entidades.length; i=i+1) {
           console.log(periodosCliente[0].entidades[i].entidad);
           console.log(periodosCliente[0].entidades[i].monto);
           console.log(periodosCliente[0].entidades[i].situacion);
         }
*/
     }
    }, [datosCargados]);

const colorSituacionBancos = (situacion) => {
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
    return ''; // Clase por defecto si el valor no coincide
  };



  return (
    <section id='contenedorSituacionBancos' style={colorSituacionBancos(situacionBancos)}>
      <div id='encabezadoSituacionBancos'>Situacion BANCOS</div>
      <article id='datosBancos'>
          <div>
                <div>{entidades.map((e, index) => (
                 <p key={index}>{e.entidad} {formatoMoneda(e.monto*1000)} {e.situacion}</p>
                ))}
                </div>
          </div>        
      </article>
    </section>    
  )
}

export default Situacionbancos


//{`$ ${e.monto*1000}`}