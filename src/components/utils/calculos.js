
  
  
  export function calcular_dias(fecha){
    const fecha_actual=new Date();            // calcular cantidad de dias a la fecha de cobro. 
    const fecha_cheque=new Date(fecha);
    const dias=(Math.round((fecha_cheque - fecha_actual)/86400000))+1;
    console.log(dias);
    return dias;
    }

  export function calculo_tasa(dias,tasas){
    const {tasaXdia,tasaAldia,tasa7dias,tasa15dias,tasa30dias}=tasas;
    console.log(tasaXdia,tasaAldia,tasa7dias,tasa15dias,tasa30dias);
    let tasa_total=0;
    if ((dias===0) || (dias===1)) {
        return Number(tasaAldia);
    }
    if ((dias>1) && (dias<7)) {
     tasa_total=Number(tasaXdia*dias) + Number(tasaAldia);
     return tasa_total;              
    }
    if (dias===7) {
       return tasa7dias;
    }
    if ((dias>7) && (dias<15)) {
    tasa_total=Number(tasaXdia*(dias-7)) + Number(tasa7dias);
    console.log("tasa diaria:",tasaXdia," ",dias," ",tasa7dias," ",tasa_total);
    return tasa_total;
    }
    if (dias===15) {
      return tasa15dias;
    }
    if ((dias>15) && (dias<30)) {
     tasa_total=Number(tasaXdia*(dias-15)) + Number(tasa15dias);
     return tasa_total;                  
    }
    if (dias===30){
      return tasa30dias;
    }
    if ((dias>30) && (dias<90)) {
     tasa_total=Number(tasaXdia*(dias-30)) + Number(tasa30dias);
     return tasa_total;                   
    }    
    if ((dias>=90)) {
      tasa_total=Number(tasaXdia*dias);
     return tasa_total;                     
                    }
return 0;    
}

export function realizarCalculosTotales(cheques,chequesCalculados){
  let totales={importeTotal:0,tasaPromedio:0,profit:0,totalApagar:0};
  let contador=0;
  for (let i = 0; i < cheques.length; i=i+1) {
    if (cheques[i].importe!=""){
           totales.importeTotal=totales.importeTotal+Number(cheques[i].importe);
            } 
  }

  for (let i = 0; i < chequesCalculados.length; i=i+1) {
    if (chequesCalculados[i].porcentaje!=""){
                 totales.tasaPromedio=totales.tasaPromedio+Number(chequesCalculados[i].porcentaje);
                 contador=contador+1;
                } 
  }

  if (contador>0) {
                 totales.tasaPromedio=totales.tasaPromedio/contador;
                  }

  for (let i = 0; i < chequesCalculados.length; i=i+1) {
    if (chequesCalculados[i].descuento!=""){
                 totales.profit=totales.profit+Number(chequesCalculados[i].descuento);
                }
  } 
  totales.totalApagar=totales.importeTotal-totales.profit;
  console.log(totales);
  return totales;

}

export function guardarTasas(tasas){
  localStorage.setItem("tasaXdia",JSON.stringify(tasas.tasaXdia));
  localStorage.setItem("tasaAldia",JSON.stringify(tasas.tasaAldia));
  localStorage.setItem("tasa7dias",JSON.stringify(tasas.tasa7dias));
  localStorage.setItem("tasa15dias",JSON.stringify(tasas.tasa15dias));
  localStorage.setItem("tasa30dias",JSON.stringify(tasas.tasa30dias));
}
  /*tasaXdia:"",
    tasaAldia:"",
    tasa7dias:"",
    tasa15dias:"",
    tasa30dias:""*/

export function existenTasas(){
  const tasaXdia= JSON.parse(localStorage.getItem("tasaXdia"));
  const tasaAldia= JSON.parse(localStorage.getItem("tasaXdia"));
  const tasa7dias= JSON.parse(localStorage.getItem("tasaXdia"));
  const tasa15dias= JSON.parse(localStorage.getItem("tasaXdia"));
  const tasa30dias= JSON.parse(localStorage.getItem("tasaXdia"));
  const hayTasas=(tasaXdia!="") && (tasaAldia!="") && (tasa7dias!="") && (tasa15dias!="") && (tasa30dias!="");
  return hayTasas;
}    

export function recuperarTasas(){
  const tasaXdia= JSON.parse(localStorage.getItem("tasaXdia"));
  const tasaAldia= JSON.parse(localStorage.getItem("tasaAldia"));
  const tasa7dias= JSON.parse(localStorage.getItem("tasa7dias"));
  const tasa15dias= JSON.parse(localStorage.getItem("tasa15dias"));
  const tasa30dias= JSON.parse(localStorage.getItem("tasa30dias"));       
  const tasas={tasaXdia:tasaXdia,tasaAldia:tasaAldia,tasa7dias:tasa7dias,tasa15dias:tasa15dias,tasa30dias:tasa30dias}      
  return tasas;
}

export function guardarCheques(cheques){
  for (let i = 0; i < cheques.length; i=i+1) {
       localStorage.setItem(`importe${i}`,JSON.stringify(cheques[i].importe));
       localStorage.setItem(`fecha${i}`,JSON.stringify(cheques[i].fecha));          
  }
}