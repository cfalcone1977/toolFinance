import React from 'react';
import Menu from '../src/components/Menu';
import { TasasProvider } from '../src/context/TasasContext';
import FormTasas from '../src/components/calculo/FormTasas';
import { ResultadosProvider } from '../src/context/SideContext';
import { ChequesProvider } from '../src/context/ChequesContext';
import { TotalesProvider } from '../src/context/TotalesContext';
import FormCheques from '../src/components/calculo/FormCheques';
import SideCheques from '../src/components/calculo/SideCheques';
import ResultadoCheques from '../src/components/calculo/ResultadoCheques';
import Footer from '../src/components/Footer';
import "./calculo.css";

function Calculo() {
  return (
    <>
      <Menu/>
      <TasasProvider>
        <FormTasas/>
        <ResultadosProvider>
        <ChequesProvider>
        <TotalesProvider>
        <section id='contenedorChequesCalculo'>
           <FormCheques/>
           <SideCheques/>
        </section>
           <ResultadoCheques/>
        </TotalesProvider>
        </ChequesProvider>   
       </ResultadosProvider>        
      </TasasProvider>
      <Footer/>
    </>
  )
}

export default Calculo