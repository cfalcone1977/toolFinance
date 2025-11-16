import React from 'react';
import { useState } from 'react';
import "./formCheques.css"

function FormCheques() {
  const cheque={importe:"", fecha:""};
  let salioInput=false;
  const [cheques,setCheques]= useState(Array(10).fill(cheque));
  const [errores,setErrores]= useState(Array(10).fill(""));
  console.log(cheques);
  
  const manejoSubmit=(e,index)=>{
    e.preventDefault();
    //console.log(cheques);
    //alert(`${cheques[0].importe}`);
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
  }
 const controladorCheque=(e,index)=>{
   const {name,value}=e.target;
   const bkCheques=[...cheques];
   let valorNuevo=value;
   //let ingresoFecha=false;
   if (name==='importe') {
                   const validador=/^\d{0,10}(\.\d{0,2})?$/;
                   if ((value!="") && (!validador.test(value))){
                                                     return;
                                                               } 
                                                                                        
                           }
/*                           
   if (name === 'fecha') {
                          //console.log(value);
                          const fechaActual= (new Date()).setHours(0,0,0,0);
                          const fechaUsuario=((new Date(value)).setHours(0,0,0,0))+86400000;
                          console.log(fechaActual);
                          console.log(fechaUsuario);
                          if (fechaActual<=fechaUsuario) {
                                             nuevosErrores[index]="";
                                               }                         
                          if (fechaActual>fechaUsuario) {
                                             nuevosErrores[index]="La fecha no pude ser anterior a la actual";
                                               }
      
                          console.log(index);
                          setErrores(nuevosErrores);
                         } */   
                        /*       
   if (name==='fecha'){
        ingresoFecha=true;
   }*/
                          
   bkCheques[index]={...bkCheques[index],[name]:valorNuevo};
   setCheques(bkCheques);
   const nuevosErrores=[...errores];
    let ocurrioError=false;
    for (let i = 0; i < cheques.length; i=i+1) {
       console.log(bkCheques[i].importe);
      if ((bkCheques[i].importe==="") && (bkCheques[i].fecha!="")){
                 nuevosErrores[i]="Falta Importe";
                 setErrores(nuevosErrores);
       
                        }
      if ((bkCheques[i].importe!="") && (bkCheques[i].fecha==="") && (salioInput)){ //&& (ingresoFecha)){
                     nuevosErrores[i]="Falta Fecha";
                     setErrores(nuevosErrores);
          
                        }
      if ((bkCheques[i].importe!="") && (bkCheques[i].fecha!="")){
                 console.log("ENTROOOOO");
                 nuevosErrores[i]="";
                 setErrores(nuevosErrores);
                        }                        
      console.log("lista Errores:",nuevosErrores);
    }
   }   
  const salidaInput=(e,index)=>{
     salioInput=true;
     console.log(salioInput);
     controladorCheque(e,index);
  }
  const borrarCheque=(e,index)=>{
    const bkCheques=[...cheques];
    const nuevosErrores=[...errores];
    bkCheques[index].importe="";
    bkCheques[index].fecha="";
    nuevosErrores[index]="";
    setErrores(nuevosErrores);
    setCheques(bkCheques);

  }
  return (
    <form id='contenedorCHEQUES' onSubmit={manejoSubmit}>
      <header id="encabezado">
        <pre>     Importe</pre><pre>Fecha</pre>
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
        <button className='boton' type='submit'>Calcular</button>
        <button className='boton' type='submit'>Reset</button>        
      </section>
    </form>
  )
}

export default FormCheques


/*
function FormCheques() {
  const [cheque1,setCheque1]= useState({importe:"",fecha:""});

  const manejoSubmit=(e)=>{
    e.preventDefault();
    if (!cheque1.importe) return;
    alert(`Cheque1 Importe: $ ${cheque1.importe} fecha1: ${cheque1.fecha}`)

  }
 const controladorNumero=(e)=>{
   const {value}=e.target;
   const validador=/^\d{0,10}(\.\d{0,2})?$/;
   if (value === '' || validador.test(value)) {
                   setCheque1(prevCheque1=>({...prevCheque1, importe:value}));
                             }
 }
const controladorFecha=(e)=>{
  const {value}=e.target;
  setCheque1(prevCheque1=>({...prevCheque1, fecha:value}));
}
  return (
    <form onSubmit={manejoSubmit}>
      <div id='contenedorCHEQUES'>
          <label htmlFor="cheque1">Cheque1</label>
          <input id='cheque1' name='importe1'  type="text"
          value={cheque1.importe}
          onChange={controladorNumero}
          />
          <label htmlFor="cheque1">fecha</label>
          <input id='cheque1' name='fecha1'  type="date"
          value={cheque1.fecha}
          onChange={controladorFecha}
          />
      </div>
      <button type='submit'>Calcular</button>
    </form>
  )
}
*/