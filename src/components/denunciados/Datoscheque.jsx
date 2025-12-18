import { useContext } from 'react'
import { useEffect, useState } from 'react';
import traerEntidades from './hooks/traerEntidades'

import "./datosCheque.css"

function Datoscheque() {
  const [nroCheque, setNroCheque]=useState("");
  const [errorConsulta, setErrorConsulta]=useState("");
  const [deshabilitarConsulta, setDeshabilitarConsulta]=useState(true);

  const { loading, error, data } = traerEntidades(); 
  console.log(data);



  const controlarNroCheque=(e)=>{
    const {value}=e.target;
    const validador=/^\d*$/;
    if ((value!="" && !validador.test(value)) || (value.length>8))  {
    return;
    }
    const BKnroCheque=value;
    setNroCheque(BKnroCheque);
    setErrorConsulta("");
    //setDatosCargados(false);
    if (BKnroCheque.length===8){
      setDeshabilitarConsulta(!(BKnroCheque.length===8));
    } else setDeshabilitarConsulta(!(BKnroCheque.length===8));
  }

  const manejoConsulta=(e)=>{
    e.preventDefault();
    //setCuitCliente(cuit); 
    setDeshabilitarConsulta(true);
  }

 const datosLimpiar=()=>{

 }

 
 

  
  return (
    <form id='contenedorFormularioDenunciados' onSubmit={manejoConsulta}>
      <section id="encabezadoDatosCuit">
        <div id='textoEncabezado'>Datos a CHEQUEAR</div>
      </section>  
      <section id='contenedorDatosEntidadyNro'> 
         {loading? 
         
          <div>CARGANDO...</div>
         :
                 <select name="entidad" id="selectEntidad">
                   <option value="select">Seleccione el BANCO</option>
                    {data.results.map((entidad, index) => (
                    <option 
                         key={index} // Clave única requerida por React
                         value={entidad.denominacion} // El valor real que se guarda en el estado
                      >
                        {entidad.denominacion} {/* El texto que ve el usuario */}
                      </option>
                     ))}
               </select>       
         }  
        <div id='contNroCheque'>
        <label htmlFor="nroCheque">Nro.Cheque:</label>
        <input id='nroCheque' type="text" name='nroCheque' value={nroCheque} placeholder='12345678' onFocus={()=>datosLimpiar()} onChange={(e)=>controlarNroCheque(e)}/>
        </div> 
      </section>    
      <section id='contenedorErroresTasas'>
         <div id='erroresCuit'>{errorConsulta}</div>
      </section>
      <button type='submit' disabled={deshabilitarConsulta} id='botonConsultarNroCheque'>Consulta</button>
    </form>
  )
}

export default Datoscheque


/*

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
    setCuit(BKcuit);
    setErrorConsulta("");
    setDatosCargados(false);
    if (BKcuit.length===11){
      setDeshabilitarConsulta(!(BKcuit.length===11));
    } else setDeshabilitarConsulta(!(BKcuit.length===11));
  }

  const manejoConsulta=(e)=>{
    e.preventDefault();
    setCuitCliente(cuit); 
    setDeshabilitarConsulta(true);
  }

 const datosLimpiar=()=>{
   setCuit("");
   setCuitCliente(""); ////prueba
   setDenominacionCliente("");
   setPeriodosCliente([]);
   setEntidades([]);
   setSituacionBancos(0);
   setSituacionCheques(0);
   setListaChequesRechazados([]);
   setDeshabilitarConsulta(true);
   setErrorConsulta("");
 }
*/