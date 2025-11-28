import Menu from './components/Menu';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Calculo from '../pages/calculo';
import Consulta from '../pages/Consulta';
import Denunciados from '../pages/Denunciados';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Calculo/>}/>
      <Route path='/Consulta' element={<Consulta/>}/>
      <Route path='/Denunciados' element={<Denunciados/>}/>
    </Routes>
  );
}

export default App



//************************IMPORTS
/*
import Menu from './components/Menu';
import './App.css';
import FormCheques from './components/calculo/FormCheques';
import FormTasas from './components/calculo/FormTasas';
import SideCheques from './components/calculo/SideCheques';
import ResultadoCheques from './components/calculo/ResultadoCheques';
import { TasasProvider } from './context/TasasContext';
import { ResultadosProvider } from './context/SideContext';
import { ChequesProvider } from './context/ChequesContext';
import { TotalesContext, TotalesProvider } from './context/TotalesContext';
import Footer from './components/Footer';


*/

//*************************CUERPO
/*
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
*/


