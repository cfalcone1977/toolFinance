import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { TasasContext } from '../../context/TasasContext';
import "./formCheques.css"


function FormCheques() {
  const { tasas, setTasas } = useContext(TasasContext);
  const cheque={importe:"", fecha:""};
  const [cheques,setCheques]= useState(Array(10).fill(cheque));
  const [errores,setErrores]= useState(Array(10).fill(""));
  const [DeshabilitarCalcular, setDeshabilitarCalcular]=useState(true);
  let tasasCompletas=false;
  let ChequeCompleto=false;
  let cantidadCheques=0;
  console.log(cheques);
  
  const manejoSubmit=(e,index)=>{
    e.preventDefault();
    console.log(e);
    console.log(index);
    console.log(cheques);
    console.log(errores);
    console.log(tasas);
    /*
    const nuevosErrores=[...errores];
    for (let i = 0; i < cheques.length; i=i+1) {
      if ((cheques[i].importe==="") && (cheques[i].fecha!="")){
                 nuevosErrores[i]="Falta Importe";
                 setErrores(nuevosErrores);
       
                        }
      if ((cheques[i].importe!="") && (cheques[i].fecha==="") && (salioInput)) {
                     nuevosErrores[i]="Falta Fecha";
                     setErrores(nuevosErrores);
          
                        }
      if ((cheques[i].importe!="") && (cheques[i].fecha!="")){
                 nuevosErrores[i]="";
                 setErrores(nuevosErrores);
                        }                        
      console.log("lista Errores:",nuevosErrores);
    }
  */

  }
 const controladorCheque=(e,index)=>{
   const {name,value}=e.target;
   const bkCheques=[...cheques];
   let valorNuevo=value;
   if (name==='importe') {
                   const validador=/^\d{0,10}(\.\d{0,2})?$/;
                   if ((value!="") && (!validador.test(value))){
                                                     return;
                                                               } 
                                                                                        
                           }                 
   bkCheques[index]={...bkCheques[index],[name]:valorNuevo};
   setCheques(bkCheques);
    /*
   const nuevosErrores=[...errores];
   for (let i = 0; i < cheques.length; i=i+1) {
       console.log(bkCheques[i].importe);
      if ((bkCheques[i].importe==="") && (bkCheques[i].fecha!="")){
                 nuevosErrores[i]="Falta Importe";
                 setErrores(nuevosErrores);
       
                        }
      if ((bkCheques[i].importe!="") && (bkCheques[i].fecha==="") && (salioInput)){
                     nuevosErrores[i]="Falta Fecha";
                     setErrores(nuevosErrores);
          
                        }
      if ((bkCheques[i].importe!="") && (bkCheques[i].fecha!="")){
                 console.log("ENTROOOOO");
                 nuevosErrores[i]="";
                 setErrores(nuevosErrores);
                        }                        
      console.log("lista Errores:",nuevosErrores);
    }*/
   }   
    

  const salidaInput=(e,index)=>{
    /*
     salioInput=true;
     console.log(salioInput);
     controladorCheque(e,index);
     salioInput=false;
     */
  }


    useEffect(()=>{
      const nuevosErrores=[...errores];
      ChequeCompleto=true;
      cantidadCheques=0;
      for (let i = 0; i < cheques.length; i=i+1) {
        if (cheques[i].importe!="" && cheques[i].fecha===""){
                        nuevosErrores[i]="Falta ingresar Fecha";
                        ChequeCompleto=(ChequeCompleto && false);
                             }
        if (cheques[i].importe==="" && cheques[i].fecha!=""){
                        nuevosErrores[i]="Falta ingresar Importe";
                        ChequeCompleto=(ChequeCompleto && false);                        
                             }
        if (cheques[i].importe==="" && cheques[i].fecha===""){        
                        nuevosErrores[i]="";             
                        ChequeCompleto=(ChequeCompleto && true);                            
        }                             
        if (cheques[i].importe!=="" && cheques[i].fecha!==""){
                        nuevosErrores[i]="";         
                        cantidadCheques=cantidadCheques+1;    
                        ChequeCompleto=(ChequeCompleto && true && cantidadCheques>0);                           
        } 
       setErrores(nuevosErrores); 
      }
    ChequeCompleto=(ChequeCompleto && cantidadCheques>0);  
    if ((ChequeCompleto && (tasas.tasaXdia!="") && (tasas.tasaAldia!="") && (tasas.tasa7dias!="") && (tasas.tasa15dias!="") && (tasas.tasa30dias!=""))) {
                      setDeshabilitarCalcular(false);
                        } else setDeshabilitarCalcular(true);
    console.log(ChequeCompleto);
    console.log(cantidadCheques);
    console.log(DeshabilitarCalcular);
    },[cheques,tasas])
   
  const borrarCheque=(e,index)=>{
    const bkCheques=[...cheques];
    const nuevosErrores=[...errores];
    if ((bkCheques[index].importe!="") || (bkCheques[index].fecha!="")){
      bkCheques[index].importe="";
      bkCheques[index].fecha="";
      nuevosErrores[index]="";
      setErrores(nuevosErrores);
      setCheques(bkCheques);
    }
  }
  const resetCheques=()=>{
   console.clear();
   console.log("Borrar datos variables de estado formulario");
   const bkCheques=[...cheques];
   const nuevosErrores=[...errores];
   for (let i = 0; i < bkCheques.length; i=i+1) {
     bkCheques[i].importe="";
     bkCheques[i].fecha="";
     nuevosErrores[i]="";
   }
   setCheques(bkCheques);
   setErrores(nuevosErrores);
  }

  return (
    <form id='contenedorCHEQUES' onSubmit={manejoSubmit}>
      <header id="encabezadoCheques">
        <div>Importe</div><div>Fecha</div>
      </header>
      {cheques.map((chq, index)=>(
        <div key={index}>
          <section id='contenedorCHEQUE'>
           <label htmlFor="" className='etiquetaImporte'>Cheque {index+1}</label>
           <input className='inputImporte' type="text" name='importe' value={chq.importe} onChange={(e)=>controladorCheque(e,index)}
           onBlur={(e)=>salidaInput(e,index)} 
           placeholder='0.00'/>
           <input className='inputFecha' type="date" name='fecha' value={chq.fecha} onChange={(e)=>controladorCheque(e,index)}/>
           <img id='eliminarCheque' src="./imagenes/trash.svg" alt="" onClick={(e)=>{borrarCheque(e,index)}} />
           </section>
           <section id='contenedorErrores'>
           <div id='errores'>{errores[index]}</div>
           </section>
        </div>
      ))}
      <section id='contenedorBotones'>
        <button className='boton' type='submit' disabled={DeshabilitarCalcular}>Calcular</button>
        <button className='boton' type='button' onClick={()=>{resetCheques()}}>Reset</button>        
      </section>
    </form>
  )
}

export default FormCheques
