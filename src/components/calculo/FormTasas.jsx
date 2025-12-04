import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { TasasContext } from '../../context/TasasContext';
import { existenTasas, recuperarTasas } from '../utils/calculos';

import "./formTasas.css";


 
function FormTasas() {

  const { tasas, setTasas } = useContext(TasasContext);

  const [errorTasas,setErrorTasas]=useState("");
  const [salioPrimeraVez,setSalioPrimeraVez]=useState(false);

  const controlarTasa=(e)=>{
    const {name,value}=e.target;
    const validador=/^\d{0,3}(\.\d{0,2})?$/;
    controlarSalidaTasas();

    if (value !="" && !validador.test(value)) {
    return;
    }
  setTasas(prevState => ({
    ...prevState,         
    [name]: value         
   }));

    console.log(value);
    console.log(tasas);

  }
  const controlarSalidaTasas=()=>{
   setSalioPrimeraVez(true);
  }
 
  useEffect (()=>{
    if (salioPrimeraVez && ((tasas.tasaXdia==="") || (tasas.tasaAldia==="") || (tasas.tasa7dias==="") || (tasas.tasa15dias==="") || (tasas.tasa30dias===""))){
        setErrorTasas("Debe ingresar todas las tasas!!");
    }else if ((tasas.tasaXdia!="") && (tasas.tasaAldia!="") && (tasas.tasa7dias!="") && (tasas.tasa15dias!="") && (tasas.tasa30dias!="")){
        setErrorTasas("");
    }
  },[tasas.tasaXdia,tasas.tasaAldia,tasas.tasa7dias,tasas.tasa15dias,tasas.tasa30dias,salioPrimeraVez])

  useEffect (()=>{
     if (existenTasas()){
                      const tasasGuardadas=recuperarTasas();
                      setTasas(tasasGuardadas);
                     }
  },[]);
 
  
  return (
    <form id='contenedorFormularioTasas'>
      <section id="encabezadoTasas">
        <pre>Tasas</pre>
      </section>  
      <section id='contenedorTasas'>
        <label htmlFor="tasaXdia">Diaria:</label>
        <input id='tasaXdia' className='inputTasa' type="text" value={tasas.tasaXdia} name='tasaXdia' placeholder=' %' onChange={(e)=>controlarTasa(e)} 
        onBlur={()=>{controlarSalidaTasas()}}/>
        <label htmlFor="tasaAldia">Al Dia:</label>
        <input id='tasaAldia' className='inputTasa' type="text" value={tasas.tasaAldia} name='tasaAldia' placeholder=' %' onChange={(e)=>controlarTasa(e)}
        onBlur={()=>{controlarSalidaTasas()}}/>        
        <label htmlFor="tasa7dia">7D:</label>
        <input id='tasa7dia' className='inputTasa' type="text" value={tasas.tasa7dias} name='tasa7dias' placeholder=' %' onChange={(e)=>controlarTasa(e)}
        onBlur={()=>{controlarSalidaTasas()}}/>
        <label htmlFor="tasa15dia">15D:</label>
        <input id='tasa15dia' className='inputTasa' type="text" value={tasas.tasa15dias} name='tasa15dias' placeholder=' %' onChange={(e)=>controlarTasa(e)}
        onBlur={()=>{controlarSalidaTasas()}}/>        
        <label htmlFor="tasa30dia">30D:</label>
        <input id='tasa30dia' className='inputTasa' type="text" value={tasas.tasa30dias} name='tasa30dias' placeholder=' %' onChange={(e)=>controlarTasa(e)}
        onBlur={()=>{controlarSalidaTasas()}}/>        
      </section>    
      <section id='contenedorErroresTasas'>
         <div id='erroresTasa'>{errorTasas}</div>
      </section>
    </form>
  )
}

export default FormTasas