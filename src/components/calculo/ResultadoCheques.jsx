import { useState, useContext } from 'react';
import { TotalesContext } from '../../context/TotalesContext';
import "./resultadoCheques.css"

function ResultadoCheques() {
  const {totales, setTotales} = useContext(TotalesContext);
  const controlarFormato=(valor)=>{
      if (valor!=null || valor!=undefined){
                                     return valor;
                                          } else return "";
  }
  return (
    <section id='contenedorResultados'> 
        <div id='importeTotal'>IMPORTE TOTAL EN CHEQUES:</div>
        <p>$ {controlarFormato(totales.importeTotal).toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}</p>
        <div id='tasaPromedio'>TASA PROMEDIO:</div>        
        <p>{controlarFormato(totales.tasaPromedio).toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(3)}%</p>
        <div id='profit'>DIFERENCIA (Profit):</div>
        <p>$ {controlarFormato(totales.profit).toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}</p>
        <div id='totalApagar'>DINERO TOTAL A PAGAR:</div>
        <p>$ {controlarFormato(totales.totalApagar).toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}</p>
    </section>
  )
}

export default ResultadoCheques

