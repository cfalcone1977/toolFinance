
  
  
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

export function realizarCalculos(cheques,tasas){


}