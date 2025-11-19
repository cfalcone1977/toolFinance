  
  
  
  export function calcular_dias(fecha){
    fecha_actual=new Date();            // calcular cantidad de dias a la fecha de cobro. 
    fecha_cheque=new Date(fecha);
    const dias=(Math.round((fecha_cheque - fecha_actual)/86400000))+1;
    console.log(dias);
    return dias;
    }

  export function calculo_tasa(dias){
    if ((dias===0) || (dias===1)) {
        return Number(tasaAlDia.value);
    }
    if ((dias>1) && (dias<7)) {
     let tasa_total=Number(tasaDiaria.value*dias) + Number(tasaAlDia.value);
     return tasa_total;              
    }
    if (dias===7) {
       return tasa7Dias.value;
    }
    if ((dias>7) && (dias<15)) {
    tasa_total=Number(tasaDiaria.value*(dias-7)) + Number(tasa7Dias.value);
    console.log("tasa diaria:",tasaDiaria.value," ",dias," ",tasa7Dias," ",tasa_total);
    return tasa_total;
    }
    if (dias===15) {
      return tasa15Dias.value;
    }
    if ((dias>15) && (dias<30)) {
     tasa_total=Number(tasaDiaria.value*(dias-15)) + Number(tasa15Dias.value);
     return tasa_total;                  
    }
    if (dias===30){
      return tasa30Dias.value;
    }
    if ((dias>30) && (dias<90)) {
     tasa_total=Number(tasaDiaria.value*(dias-30)) + Number(tasa30Dias.value);
     return tasa_total;                   
    }    
    if ((dias>=90)) {
      tasa_total=Number(tasaDiaria.value*dias);
     return tasa_total;                     
                    }
return 0;    

}