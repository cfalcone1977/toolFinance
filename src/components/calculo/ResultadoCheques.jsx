import React from 'react'
import { useState, useContext } from 'react';
import { SideContext } from '../../context/SideContext';
import { ChequesContext } from '../../context/ChequesContext';
import { TotalesContext } from '../../context/TotalesContext';
import "./resultadoCheques.css"

function ResultadoCheques() {
  const {totales, setTotales} = useContext(TotalesContext);

  return (
    <section id='contenedorResultados'> 
        <p>IMPORTE TOTAL EN CHEQUES:</p>
        <p>$ {totales.importeTotal.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}</p>
        <div>TASA PROMEDIO:</div>        
        <p>{totales.tasaPromedio.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(3)}%</p>
        <div>DIFERENCIA (Profit):</div>
        <p>$ {totales.profit.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}</p>
        <div>DINERO TOTAL A PAGAR:</div>
        <p>$ {totales.totalApagar.toLocaleString('es-Es',{minimumFractionDigits: 2, maximumFractionDigits: 2}).padStart(6)}</p>
    </section>
  )
}

export default ResultadoCheques

/*
  const {cheques, setCheques} = useContext(ChequesContext);
  let totalCheques=0;
  for (let i = 0; i < cheques.length; i=i+1) {
      if (cheques[i].importe!=""){
                 totalCheques=totalCheques + Number(cheques[i].importe);
               }
  }
  console.log("TOTAL CHEQUES",totalCheques);

*/