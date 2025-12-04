import { useState, useContext } from 'react';
import { TotalesContext } from '../../context/TotalesContext';
import "./resultadoCheques.css"

function ResultadoCheques() {
  const {totales, setTotales} = useContext(TotalesContext);

  return (
    <section id='contenedorResultados'> 
        <div id='importeTotal'>IMPORTE TOTAL EN CHEQUES:</div>
        <p>$ {totales.importeTotal.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}</p>
        <div id='tasaPromedio'>TASA PROMEDIO:</div>        
        <p>{totales.tasaPromedio.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(3)}%</p>
        <div id='profit'>DIFERENCIA (Profit):</div>
        <p>$ {totales.profit.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}</p>
        <div id='totalApagar'>DINERO TOTAL A PAGAR:</div>
        <p>$ {totales.totalApagar.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}</p>
    </section>
  )
}

export default ResultadoCheques

