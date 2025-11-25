import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { TasasContext } from '../../context/TasasContext';
import { SideContext } from '../../context/SideContext';
import { ChequesContext } from '../../context/ChequesContext';
import { TotalesContext } from '../../context/TotalesContext';

import {calcular_dias, calculo_tasa, realizarCalculosTotales} from "../utils/calculos"
import "./formCheques.css"


function FormCheques() {
  const { tasas, setTasas } = useContext(TasasContext);
  const { calculos, setCalculos } = useContext(SideContext);
  const { cheques, setCheques } = useContext(ChequesContext);
  const { totales, setTotales} =useContext(TotalesContext);

  /*const cheque={importe:"", fecha:""};
  const [cheques,setCheques]= useState(Array(10).fill(cheque));*/
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
    const nuevosCalculos=[...calculos];
    for (let i = 0; i < cheques.length; i=i+1) {
      if (cheques[i].importe!=""){
        let dias=Number(calcular_dias(cheques[i].fecha));
        if (dias<0){
                 dias=0;
                   };
        const tasaAaplicar=Number(calculo_tasa(dias,tasas));
        const descuentoCalculado=((Number(cheques[i].importe)/100)*tasaAaplicar);
        const liquidarCalculado=(Number(cheques[i].importe)-((Number(cheques[i].importe)/100)*tasaAaplicar));
        nuevosCalculos[i]={...nuevosCalculos[i],diasCobro: dias, 
                          porcentaje: tasaAaplicar,
                descuento: descuentoCalculado,
                liquidar: liquidarCalculado,
            };
        console.log(dias);
        console.log(tasaAaplicar.toFixed(2)+"%");
        console.log("resultado:",(Number(cheques[i].importe)-((Number(cheques[i].importe)/100)*tasaAaplicar)));
      } 
    }
    console.log("resultado Calculos: ",nuevosCalculos);
    setCalculos(nuevosCalculos);
    let resultados= realizarCalculosTotales(cheques,nuevosCalculos);
    console.log("los valores a mostrar son: ",resultados);
    /*
    const nuevosResultados={
    ...resultados,    
    [importeTotal]: resultados.importeTotal, [tasaPromedio]: resultados.tasaPromedio, 
    [profit]: resultados.profit, [totalApagar]: resultados.totalApagar 
   };*/
    setTotales(resultados);
    
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
    const nuevosCalculos=[...calculos];
    if ((bkCheques[index].importe!="") || (bkCheques[index].fecha!="")){
      bkCheques[index].importe="";
      bkCheques[index].fecha="";

      nuevosErrores[index]="";

      nuevosCalculos[index].diasCobro="";
      nuevosCalculos[index].porcentaje="";
      nuevosCalculos[index].descuento="";            
      nuevosCalculos[index].liquidar="";      

      setErrores(nuevosErrores);
      setCheques(bkCheques);
      setCalculos(nuevosCalculos);
      let resultados= realizarCalculosTotales(bkCheques,nuevosCalculos);
      setTotales(resultados);
    }
  }
  const resetCheques=()=>{
   console.clear();
   console.log("Borrar datos variables de estado formulario");
   const bkCheques=[...cheques];
   const nuevosErrores=[...errores];
   const nuevosCalculos=[...calculos];
   for (let i = 0; i < bkCheques.length; i=i+1) {
     bkCheques[i].importe="";
     bkCheques[i].fecha="";

     nuevosErrores[i]="";

     nuevosCalculos[i].diasCobro="";
     nuevosCalculos[i].porcentaje="";
     nuevosCalculos[i].descuento="";            
     nuevosCalculos[i].liquidar="";    

   }
   setCheques(bkCheques);
   setErrores(nuevosErrores);
   setCalculos(nuevosCalculos);  
   let resultados= realizarCalculosTotales(bkCheques,nuevosCalculos);
   setTotales(resultados);    
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
