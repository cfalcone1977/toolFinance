import { useContext } from 'react'
import { useEffect, useState } from 'react';
import { DatosClienteContext } from '../../context/DatosClienteContext';


import "./datosCuit.css"

function Datoscuit() {
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

 
 

  
  return (
    <form id='contenedorFormularioDatosCUIT' onSubmit={manejoConsulta}>
      <section id="encabezadoDatosCuit">
        <div id='textoEncabezado'>Datos a CHEQUEAR</div>
      </section>  
      <section id='contenedorCUIT'> 
        <label htmlFor="CUIT">C.U.I.T.:</label>
        <input id='CUIT' className='inputCUIT' type="text" name='CUIT' value={cuit} placeholder='20261346959' onFocus={()=>datosLimpiar()} onChange={(e)=>controlarCUIT(e)}/>
      </section>    
      <section id='contenedorErroresTasas'>
         <div id='erroresCuit'>{errorConsulta}</div>
      </section>
      <button type='submit' disabled={deshabilitarConsulta} id='botonConsultarCuit'>Consulta</button>
    </form>
  )
}

export default Datoscuit