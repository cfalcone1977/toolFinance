import React from 'react'

function Datoscuit() {
 const { cuit, setCuit } = useContext("");


  const controlarCuit=(e)=>{
    const {name,value}=e.target;
    const validador=/^\d{0,3}(\.\d{0,2})?$/;
    controlarSalidaTasas();

    if (value !="" && !validador.test(value)) {
    return;
    }
  setTasas(prevState => ({
    ...prevState,         // Copia todas las tasas existentes
    [name]: value         // Sobreescribe solo la tasa cuyo nombre coincide con el input
   }));


  }
  const controlarSalidaTasas=()=>{
   setSalioPrimeraVez(true);
   console.log("Salio del Formulario",salioPrimeraVez);
  }
 
  useEffect (()=>{
    if (salioPrimeraVez && ((tasas.tasaXdia==="") || (tasas.tasaAldia==="") || (tasas.tasa7dias==="") || (tasas.tasa15dias==="") || (tasas.tasa30dias===""))){
        setErrorTasas("Debe ingresar todas las tasas!!");
    }else if ((tasas.tasaXdia!="") && (tasas.tasaAldia!="") && (tasas.tasa7dias!="") && (tasas.tasa15dias!="") && (tasas.tasa30dias!="")){
        setErrorTasas("");
    }
  },[tasas.tasaXdia,tasas.tasaAldia,tasas.tasa7dias,tasas.tasa15dias,tasas.tasa30dias,salioPrimeraVez])
 

  
  return (
    <form id='contenedorFormularioDatosCUIT'>
      <section id="encabezadoDatosCuit">
        <pre>Datos a CHEQUEAR</pre>
      </section>  
      <section id='contenedorCUIT'> 
        <label htmlFor="CUIT">CUIT:</label>
        <input id='CUIT' className='inputCUIT' type="text" value={tasas.tasaXdia} name='tasaXdia' placeholder=' %' onChange={(e)=>controlarTasa(e)} 
        onBlur={()=>{controlarSalidaTasas()}}/>
      </section>    
      <section id='contenedorErroresTasas'>
         <div id='erroresTasa'>{errorTasas}</div>
      </section>
    </form>
  )
}

export default Datoscuit
