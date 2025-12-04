import { useContext, useEffect } from 'react';
import "./situacionBancos.css";
import { DatosClienteContext } from '../../context/DatosClienteContext';
import { formatoMoneda } from '../utils/calculos';

function Situacionbancos() {
  const {periodosCliente, setPeriodosCliente}=useContext(DatosClienteContext);
  const {entidades, setEntidades}=useContext(DatosClienteContext);
  const {datosCargados,setDatosCargados}=useContext(DatosClienteContext);
  const {situacionBancos, setSituacionBancos}=useContext(DatosClienteContext);


  let peorSituacion=1;
  useEffect(() => {
     if (datosCargados){
         for (let i = 0; i < entidades.length; i=i+1) {
            if  (peorSituacion<entidades[i].situacion){
                                                 peorSituacion=entidades[i].situacion;
                                                      }
         }
         setSituacionBancos(peorSituacion);
         
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
    return ''; 
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